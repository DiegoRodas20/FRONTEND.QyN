import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
    selector: 'app-ver-producto',
    templateUrl: 'ver-producto.component.html'
})

export class VerProductoComponent implements OnInit {

    formProducto: FormGroup
    urlPorDefecto: string = '../../../../../assets/images/productodefault.jpg'
    urlImage: string
    lCategorias: Category[] = []
    itemActually: string = ''

    lShowCatalog: any[] = [
        { value: true, name: 'Si' },
        { value: false, name: 'No' }
    ]

    constructor(
        private _productoService: ProductoService,
        private _categoryService: CategoryService,
        private _dialogRef: MatDialogRef<VerProductoComponent>,
        private _formBuilder: FormBuilder,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.crearFormProducto()
        this.listarCategorias()
        this.listarProductoxID(this._dialogData)
    }

    crearFormProducto() {
        this.formProducto = this._formBuilder.group({
            code: [null, []],
            categoryId: [null, []],
            name: [null, []],
            salesPrice: [null, []],
            purchasePrice: [null, []],
            minStock: [null, []],
            maxStock: [null, []],
            showInCatalog: [null, []],
        })
    }

    async listarCategorias() {
        try {
            const data: ResponseData = await this._categoryService.getCategorias().toPromise()
            this.lCategorias = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async listarProductoxID(idProducto: string) {
        try {
            const data: ResponseData = await this._productoService.getProductoxID(idProducto).toPromise()
            this.formProducto.patchValue(data.data)
            this.urlImage = data.data['urlImage']
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    itemSeleccionado(item) {
        console.log('VER PRODUCTO COMPONENT', item)
        this.itemActually = item.name
    }

    salir() {
        this._dialogRef.close()
    }

}