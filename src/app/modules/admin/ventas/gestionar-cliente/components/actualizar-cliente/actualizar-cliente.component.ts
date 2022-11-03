import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateClient } from 'src/app/core/models/client.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { TypeDocument } from 'src/app/core/models/typedocument.model';
import { ClientService } from 'src/app/core/services/client.service';
import { TypeDocumentService } from 'src/app/core/services/typedocument.service';

@Component({
    selector: 'app-actualizar-cliente',
    templateUrl: 'actualizar-cliente.component.html'
})

export class ActualizarClienteComponent implements OnInit {

    formCliente: FormGroup
    lTypeDocument: TypeDocument[] = []

    // Alert Modal
    typeModal: string
    openModal: boolean = false
    contenidoModal: string

    constructor(
        private _clienteService: ClientService,
        private _typedocumentService: TypeDocumentService,
        private _dialogRef: MatDialogRef<ActualizarClienteComponent>,
        private _formBuilder: FormBuilder,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.crearFormCliente()
        this.listarTypeDocument()
        this.listarClientexID(this._dialogData)
    }

    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            typeDocumentId: [null, []],
            numberDocument: [null, []],
            name: [null, []],
            area: [null, []],
            phone: [null, []],
            email: [null, []],
            address: [null, []]
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

        console.log(Cliente)

        try {
            let data: ResponseData = await this._clienteService.actualizarCliente(this._dialogData, Cliente)

            if (!data.error) {

                let contenido: any = {
                    type: 'success',
                    text: data.message
                }

                this.listarClientexID(this._dialogData)
                this.onOpenModal(contenido)
            }
        }
        catch (error) {
            console.log(error)

            let contenido: any = {
                type: 'error',
                text: error.error.error
            }
            this.onOpenModal(contenido)
        }

    }

    onOpenModal(contenido: any) {
        this.openModal = true
        this.typeModal = contenido.type
        this.contenidoModal = contenido.text
    }

    onCloseModal(event: boolean) {
        this.openModal = event
        this._dialogRef.close()
    }

    salir() {
        this._dialogRef.close()
    }

}