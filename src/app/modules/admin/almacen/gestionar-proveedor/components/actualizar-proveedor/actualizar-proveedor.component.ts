import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({

    selector: 'app-actualizar-proveedor',
    templateUrl: 'actualizar-proveedor.component.html'
})

export class ActualizarProveedorComponent implements OnInit {

    idProveedor: string
    formProveedor: FormGroup

    constructor(
        private _formBuilder: FormBuilder,
        private _proveedorService: SupplierService,
        private _dialogRef: MatDialogRef<ActualizarProveedorComponent>,
        private _alertService: AlertService,
        private _toastService: ToastService,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.crearFormProveedor()
        this.idProveedor = this._dialogData
        this.listarProveedorxID(this.idProveedor)
    }

    crearFormProveedor() {
        this.formProveedor = this._formBuilder.group({
            ruc: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(11)]],
            name: [null, [Validators.required, Validators.maxLength(30)]],
            area: [null, [Validators.required, Validators.maxLength(30)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]]
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

    async actualizarProveedor() {

        if (this.formProveedor.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
            this.formProveedor.markAllAsTouched()
            return
        }

        let form = this.formProveedor.value

        let Proveedor: any = {
            ruc: form.ruc,
            name: form.name,
            area: form.area,
            email: form.email,
        }

        try {
            let data = await this._proveedorService.actualizarProveedores(this.idProveedor, Proveedor)
            this.salir()
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message });
        }
        catch (error) {
            console.log(error)
        }
    }

    salir() {
        this._dialogRef.close()
    }

    cssValidate(control: string) {
        if (this.formProveedor.controls[control].touched) {
            if (this.formProveedor.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }
}






