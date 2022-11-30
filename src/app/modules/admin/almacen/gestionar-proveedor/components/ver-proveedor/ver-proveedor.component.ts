import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({

    selector: 'app-ver-proveedor',
    templateUrl: 'ver-proveedor.component.html'
})

export class VerProveedorComponent implements OnInit {

    idProveedor: string
    formProveedor: FormGroup

    constructor(
        private _formBuildaer: FormBuilder,
        private _dialogRef: MatDialogRef<VerProveedorComponent>,
        private _proveedorService: SupplierService,

        @Inject(MAT_DIALOG_DATA) private _dialogData,
    ) { }

    ngOnInit() {
        this.crearFormProveedor()
        this.idProveedor = this._dialogData
        this.listarProveedorxID(this.idProveedor)
    }

    crearFormProveedor() {
        this.formProveedor = this._formBuildaer.group({
            ruc: [null, []],
            name: [null, []],
            area: [null, []],
            email: [null, []],
        })
    }

    async listarProveedorxID(idProveedor: string) {
        try {
            const data: any = await this._proveedorService.getProveedoresxID(idProveedor).toPromise()
            this.formProveedor.patchValue(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    salir() {
        this._dialogRef.close()
    }
}