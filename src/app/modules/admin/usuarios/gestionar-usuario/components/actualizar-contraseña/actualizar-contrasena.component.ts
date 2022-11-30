import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ResponseData } from 'src/app/core/models/response.model';
import { updatePassword } from 'src/app/core/models/user.model';
import { Alert } from 'src/app/core/models/alert.model';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Component({
    selector: 'app-actualizar-contrasena',
    templateUrl: 'actualizar-contrasena.component.html'
})

export class ActualizarContrasenaComponent implements OnInit {

    formContrasena: FormGroup

    constructor(
        private _formBuilder: FormBuilder,
        private _usuarioService: UserService,
        private _dialogRef: MatDialogRef<ActualizarContrasenaComponent>,

        @Inject(MAT_DIALOG_DATA) private _dialogData,
        private _alertService: AlertService,
        private _toastService: ToastService
    ) { }

    ngOnInit() {
        this.crearFormContrasena()
    }

    crearFormContrasena() {
        this.formContrasena = this._formBuilder.group({
            password: [null, [Validators.required, Validators.maxLength(30)]],
        })
    }

    async actualizarContrasena() {

        if (this.formContrasena.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
            this.formContrasena.markAllAsTouched()
            return
        }

        let form = this.formContrasena.value

        let Contrasena: updatePassword = {
            id: this._dialogData,
            password: form.password
        }

        try {
            let data: ResponseData = await this._usuarioService.actualizarContrasena(this._dialogData, Contrasena)

            this.salir()
            this._alertService.openModal({
                typeModal: 'success',
                contenidoModal: data.message
            })
        }
        catch (error) {
            console.log(error)
        }

    }

    salir() {
        this._dialogRef.close()
    }

    cssValidate(control: string) {
        if (this.formContrasena.controls[control].touched) {
            if (this.formContrasena.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }
}
