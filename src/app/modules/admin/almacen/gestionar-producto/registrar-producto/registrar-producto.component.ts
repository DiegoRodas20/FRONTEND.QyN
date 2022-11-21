import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';
import { Product, RegisterProduct } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { FirebaseStorageService } from 'src/app/core/services/firebase-storage.service';
// import { FirebaseStorageService } from 'src/app/core/services/firebase-storage.service';
import { ProductoService } from 'src/app/core/services/product.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-registrar-producto',
    templateUrl: 'registrar-producto.component.html'
})

export class RegistrarProductoComponent implements OnInit {

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

    fileToUpload: File | null = null;

    constructor(
        private _productoService: ProductoService,
        private _categoryService: CategoryService,
        private _dialogRef: MatDialogRef<RegistrarProductoComponent>,
        private _formBuilder: FormBuilder,
        private _firebaseStorage: FirebaseStorageService,
        private _alertService: AlertService

    ) { }

    ngOnInit() {
        this.listarCategorias()
        this.crearFormProducto()
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
            showInCatalog: Boolean(form.showInCatalog),
            urlImage: ''
        }

        try {
            producto.urlImage = await this.subirImgProducto(this.fileToUpload)
            let data: ResponseData = await this._productoService.registrarProducto(producto)
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
            this._dialogRef.close()
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
    }

    // subirImgProducto(file: File, producto: any) {

    //     let numberOnly = new Date().getTime();
    //     let finalName = String(numberOnly) + file.name
    //     let referencia = this._firebaseStorage.referenciaCloudStorage(finalName)
    //     let tarea = this._firebaseStorage.tareaCloudStorage(finalName, file)

    //     return new Promise((resolve, reject) => {

    //         //Cambia el porcentaje
    //         tarea.percentageChanges().subscribe((porcentaje) => {
    //             this.subiendoArchivo = true;
    //             this.porcentajeFile = porcentaje;
    //             if (porcentaje == 100) {
    //                 referencia.getDownloadURL().subscribe((URL) => {
    //                     this.formProducto.controls.urlArchivo.setValue(URL)
    //                     this.formProducto.controls.nombreArchivo.setValue(file.name)
    //                     producto.urlArchivo = URL;
    //                     producto.nombreArchivo = file.name;
    //                     this.subiendoArchivo = false;
    //                     resolve('Upload done');

    //                 },
    //                     (err1) => { reject(err1); console.error(err1) });
    //             }
    //         },
    //             (err2) => { reject(err2); console.error(err2) });
    //     })
    // }

    modificarCSSModal() {
        this.modalClass = ''
    }

    salir() {
        this._dialogRef.close()
    }



}