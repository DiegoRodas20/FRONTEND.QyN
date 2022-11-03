import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { TypeDocument } from 'src/app/core/models/typedocument.model';
import { ClientService } from 'src/app/core/services/client.service';
import { TypeDocumentService } from 'src/app/core/services/typedocument.service';

@Component({
    selector: 'app-ver-cliente',
    templateUrl: 'ver-cliente.component.html'
})

export class VerClienteComponent implements OnInit {

    formCliente: FormGroup
    urlImage: string
    lTypeDocument: TypeDocument[] = []
    itemActually: string = ''

    constructor(
        private _clienteService: ClientService,
        private _typedocumentService: TypeDocumentService,
        private _dialogRef: MatDialogRef<VerClienteComponent>,
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

    salir() {
        this._dialogRef.close()
    }

}