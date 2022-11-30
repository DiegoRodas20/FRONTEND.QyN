import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { UserService } from 'src/app/core/services/user.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    providers: [DatePipe],
    selector: 'app-actualizar-usuario',
    templateUrl: 'actualizar-usuario.component.html'
})

export class ActualizarUsuarioComponent implements OnInit {

    idUsuario: number
    lEstados: any[] = [{ status: true, name: 'Activo' }, { status: false, name: 'Inactivo' }]
    formUsuario: FormGroup

    constructor(
        private _dialogRef: MatDialogRef<ActualizarUsuarioComponent>,
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _alertService: AlertService,
        private _usuarioService: UserService,
        private _datePipe: DatePipe,

        @Inject(MAT_DIALOG_DATA) private _dialogData,
    ) { }

    ngOnInit() {
        this.crearFormUsuario()

        this.idUsuario = this._dialogData
        this.listarUsuarioxID(this.idUsuario)
    }

    crearFormUsuario() {
        this.formUsuario = this._formBuilder.group({
            firstName: [null, [Validators.required, Validators.maxLength(30)]],
            lastName: [null, [Validators.required, Validators.maxLength(30)]],
            surName: [null, [Validators.required, Validators.maxLength(30)]],
            bornDate: [null, [Validators.required]],
            isActive: [null, []],
        })
    }

    async listarUsuarioxID(idUsuario: number) {
        try {
            const data: any = await this._usuarioService.getUsuarioxID(idUsuario).toPromise()
            this.formUsuario.patchValue(data.data)
            let date = new Date(data.data['bornDate'])
            date.setDate(date.getDate() + 1);
            this.formUsuario.controls['bornDate'].setValue(this._datePipe.transform(date, 'yyyy-MM-dd'))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async actualizarUsuario() {

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
            firstName: form.firstName,
            lastName: form.lastName,
            surName: form.surName,
            bornDate: form.bornDate,
            isActive: (form.isActive == "true" || form.isActive == true) ? true : false
        }

        try {
            let data = await this._usuarioService.actualizarUsuario(this.idUsuario, Usuario)

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

    salir(){
        this._dialogRef.close()
    }

}