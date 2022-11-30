import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from 'src/app/core/models/alert.model';
import { UpdateClient } from 'src/app/core/models/client.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { TypeDocument } from 'src/app/core/models/typedocument.model';
import { ClientService } from 'src/app/core/services/client.service';
import { TypeDocumentService } from 'src/app/core/services/typedocument.service';
import { AddressMapComponent } from 'src/app/shared/components/address-map/address-map.component';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-actualizar-cliente',
    templateUrl: 'actualizar-cliente.component.html'
})

export class ActualizarClienteComponent implements OnInit {

    formCliente: FormGroup
    lTypeDocument: TypeDocument[] = []
    openModal: number = 0

    constructor(
        private _clienteService: ClientService,
        private _typedocumentService: TypeDocumentService,
        private _dialogRef: MatDialogRef<ActualizarClienteComponent>,
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _toastService: ToastService,
        private _dialog: MatDialog,

        @Inject(MAT_DIALOG_DATA) private _dialogData,
    ) { }

    ngOnInit() {
        this.crearFormCliente()
        this.listarTypeDocument()
        this.listarClientexID(this._dialogData)
    }

    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            typeDocumentId: [null, [Validators.required]],
            numberDocument: [null, [Validators.required]],
            name: [null, [Validators.required]],
            area: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            email: [null, [Validators.required]],
            address: [null, [Validators.required]]
        })
    }

    async listarTypeDocument() {
        try {
            const data: ResponseData = await this._typedocumentService.getTypeDocument().toPromise()
            this.lTypeDocument = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async listarClientexID(idCliente: string) {
        try {
            const data: ResponseData = await this._clienteService.getClientexID(idCliente).toPromise()
            this.formCliente.patchValue(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async actualizarCliente() {

        if (this.formCliente.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
            this.formCliente.markAllAsTouched()
            return
        }

        let form = this.formCliente.value

        let Cliente: UpdateClient = {
            id: this._dialogData,
            typeDocumentId: Number(form.typeDocumentId),
            numberDocument: form.numberDocument,
            name: form.name,
            area: form.area,
            phone: form.phone,
            email: form.email,
            address: form.address
        }

        try {
            let data: ResponseData = await this._clienteService.actualizarCliente(this._dialogData, Cliente)

            this.salir()
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
        }
        catch (error) {
            console.log(error)
        }
    }

    openMap() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '100%'
        dialogConfig.autoFocus = false
        
        const dialogReg = this._dialog.open(AddressMapComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => console.log(result))
    }

    salir() {
        this._dialogRef.close()
    }

    cssValidate(control: string) {
        if (this.formCliente.controls[control].touched) {
            if (this.formCliente.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }

}