import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ResponseData } from 'src/app/core/models/response.model';
import { updatePassword } from 'src/app/core/models/user.model';

@Component({
    selector: 'app-actualizar-contrasena',
    templateUrl: 'actualizar-contrasena.component.html'
})

export class ActualizarContrasenaComponent implements OnInit {

    formContrasena: FormGroup

     // Alert Modal
     typeModal: string
     openModal: boolean = false
     contenidoModal: string

    constructor(
        private _formBuilder: FormBuilder,
        private _usuarioService: UserService,
        private _dialogRef: MatDialogRef<ActualizarContrasenaComponent>,
        
        @Inject(MAT_DIALOG_DATA) private _dialogData,
        private _alertService: AlertService,
    ) { }

    ngOnInit() {
        this.crearFormContrasena()
        this.listarUsuarioxID(this._dialogData)
    }

    async listarUsuarioxID(idUsuario: number) {
        try {
            const data: ResponseData = await this._usuarioService.getUsuarioxID(idUsuario).toPromise()
            this.formContrasena.patchValue(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    crearFormContrasena() {
        this.formContrasena = this._formBuilder.group({
            password: [null, [Validators.required, Validators.maxLength(30)]],
        })
    }

    async actualizarContrasena(){
        let form = this.formContrasena.value

        let Contrasena: updatePassword = {
            id: this._dialogData,
            password: form.password
        }
        console.log(Contrasena)

        let data: ResponseData = await this._usuarioService.actualizarContrasena(this._dialogData, Contrasena)

        if(!data.error){
            this.listarUsuarioxID(this._dialogData)
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
        }
    }

    salir() {
        this._dialogRef.close()
      }
}
