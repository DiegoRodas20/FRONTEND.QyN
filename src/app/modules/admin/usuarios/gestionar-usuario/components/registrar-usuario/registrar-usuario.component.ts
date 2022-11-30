import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { UserService } from 'src/app/core/services/user.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({

    selector: 'app-registrar-usuario',
    templateUrl: 'registrar-usuario.component.html'
})

export class RegistrarUsuarioComponent implements OnInit {

    formUsuario: FormGroup

    constructor(
        private _dialogRef: MatDialogRef<RegistrarUsuarioComponent>,
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _toastService: ToastService,
        private _usuarioService: UserService
    ) { }

    ngOnInit() {
        this.crearFormUsuario()
    }

    crearFormUsuario() {
        this.formUsuario = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
            password: [null, [Validators.required, Validators.maxLength(30)]],
            firstName: [null, [Validators.required, Validators.maxLength(30)]],
            lastName: [null, [Validators.required, Validators.maxLength(30)]],
            surName: [null, [Validators.required, Validators.maxLength(30)]],
            bornDate: [null, [Validators.required]],
        })
    }

    async registrarUsuario() {

        if (this.formUsuario.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
            this.formUsuario.markAllAsTouched()
            return
        }

        let form = this.formUsuario.value

        let Usuario: any = {
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            surName: form.surName,
            bornDate: form.bornDate,
        }

        try {
            let data = await this._usuarioService.registrarUsuario(Usuario)

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
        if (this.formUsuario.controls[control].touched) {
            if (this.formUsuario.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }

}