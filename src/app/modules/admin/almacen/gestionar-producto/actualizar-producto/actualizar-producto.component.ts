import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
    selector: 'app-actualizar-producto',
    templateUrl: 'actualizar-producto.component.html'
})

export class ActualizarProductoComponent implements OnInit {

    formProducto: FormGroup
    urlPorDefecto: string = '../../../../../assets/images/productodefault.jpg'
    urlImage: string
    lCategorias: Category[] = []
    itemActually: string = ''

    mensaje = "";
    modalClass: string = ''

    lShowCatalog: any[] = [
        { value: true, name: 'Si' },
        { value: false, name: 'No' }
    ]

    constructor(
        private _productoService: ProductoService,
        private _categoryService: CategoryService,
        private _dialogRef: MatDialogRef<ActualizarProductoComponent>,
        private _formBuilder: FormBuilder,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.listarCategorias()
        this.crearFormProducto()

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
            stock: [null, []],
            showInCatalog: [null, []],
            urlImage: [null, []]
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
            this.formProducto.controls['urlImage'].setValue(this.urlImage)

        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async actualizarProducto() {
        if (this.formProducto.invalid) {
            this.formProducto.markAllAsTouched()
            return
        }

        let form = this.formProducto.value

        let producto: any = {
            code: form.code,
            categoryId: Number(form.categoryId),
            name: form.name,
            salesPrice: Number(form.salesPrice),
            purchasePrice: Number(form.purchasePrice),
            minStock: Number(form.minStock),
            maxStock: Number(form.maxStock),
            stock: Number(form.stock),
            showInCatalog: form.showInCatalog == "false" ? false : true,
            urlImage: form.urlImage
        }


        try {
            let data: ResponseData = await this._productoService.actualizarProducto(producto, this._dialogData)

            if (!data.error) {
                this.modalClass = ' overflow-y-auto show'
                this.mensaje = "Se actualizo el producto correctamente."
            }

            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    modificarCSSModal() {
        this.modalClass = ''
    }

    salir() {
        this._dialogRef.close()
    }


}