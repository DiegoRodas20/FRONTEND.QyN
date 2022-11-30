import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Alert } from 'src/app/core/models/alert.model';
import { Category } from 'src/app/core/models/category.model';
import { Product, RegisterProduct } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { FirebaseStorageService } from 'src/app/core/services/firebase-storage.service';
import { ProductoService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-registrar-producto',
    templateUrl: 'registrar-producto.component.html'
})

export class RegistrarProductoComponent implements OnInit {

    formProducto: FormGroup
    urlImage: string
    lCategorias: Category[] = []
    itemActually: string = ''

    mensaje = "";

    lShowCatalog: any[] = [
        { value: true, name: 'Si' },
        { value: false, name: 'No' }
    ]

    fileToUpload: File | null = null;
    preImage: string

    constructor(
        private _productoService: ProductoService,
        private _categoryService: CategoryService,
        private _sanitizer: DomSanitizer,
        private _dialogRef: MatDialogRef<RegistrarProductoComponent>,
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _firebaseStorage: FirebaseStorageService,
        private _alertService: AlertService

    ) { }

    ngOnInit() {
        this.listarCategorias()
        this.crearFormProducto()
    }

    crearFormProducto() {
        this.formProducto = this._formBuilder.group({
            code: [null, [Validators.required]],
            categoryId: [null, [Validators.required]],
            name: [null, [Validators.required]],
            salesPrice: [null, [Validators.required]],
            purchasePrice: [null, [Validators.required]],
            minStock: [null, [Validators.required]],
            maxStock: [null, [Validators.required]],
            stock: [null, [Validators.required]],
            showInCatalog: [null, [Validators.required]],
            urlImage: [null, []],
            uploadFile: [null, [Validators.required]]
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

    async registrarProducto() {
        if (this.formProducto.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
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
            showInCatalog: form.showInCatalog,
            urlImage: ''
        }

        try {
            producto.urlImage = await this.subirImgProducto(this.fileToUpload)
            let data: ResponseData = await this._productoService.registrarProducto(producto)
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
            this.salir()
        }
        catch (error) {
            console.log(error)
        }
    }

    async subirImgProducto(file: File) {
        try {
            return await this._firebaseStorage.subirArchivo(file)
        } catch (error) {
            this._alertService.openModal({ typeModal: 'error', contenidoModal: 'Hubo un error al momento de subir la foto.' })
            console.log(error)

            throw error;
        }
    }

    handleFileInput(event: Event) {
        this.fileToUpload = event.target['files'].item(0);

        this.extraerBase64(this.fileToUpload).then((imagen: any) => {
            this.preImage = imagen.base
        })
    }

    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL($event)
            reader.onload = () => {
                resolve({
                    base: reader.result
                })
            }
            reader.onerror = error => {
                resolve({
                    base: null
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    })

    salir() {
        this._dialogRef.close()
    }

    cssValidate(control: string) {
        if (this.formProducto.controls[control].touched) {
            if (this.formProducto.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }
}