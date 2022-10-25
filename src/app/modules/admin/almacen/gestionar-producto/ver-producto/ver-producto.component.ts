import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseData } from 'src/app/core/models/response.model';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
    selector: 'app-ver-producto',
    templateUrl: 'ver-producto.component.html'
})

export class VerProductoComponent implements OnInit {

    formProducto: FormGroup
    urlPorDefecto: string = '../../../../../assets/images/productodefault.jpg'
    urlImage: string

    constructor(
        private _productoService: ProductoService,
        private _dialogRef: MatDialogRef<VerProductoComponent>,
        private _formBuilder: FormBuilder,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.crearFormProducto()
        this.listarProductoxID(this._dialogData)
    }

    crearFormProducto() {
        this.formProducto = this._formBuilder.group({
            code: [null, []],
            name: [null, []],
            salesPrice: [null, []],
            purchasePrice: [null, []],
            minStock: [null, []],
            maxStock: [null, []]
        })
    }

    async listarProductoxID(idProducto: string) {
        try {
            console.log(idProducto)
            const data: ResponseData = await this._productoService.getProductoxID(idProducto).toPromise()
            this.formProducto.patchValue(data.data)
            this.urlImage = data.data['urlImage']
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    salir(){
        this._dialogRef.close()
    }

}