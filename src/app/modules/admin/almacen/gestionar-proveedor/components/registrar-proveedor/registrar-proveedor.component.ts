import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/services/supplier.service';


@Component({

    selector: 'app-registrar-proveedor',
    templateUrl: 'registrar-proveedor.component.html'
})

export class RegistrarProveedorComponent implements OnInit {
    
    formProveedor: FormGroup
    modalClass: string = ''

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuildaer: FormBuilder,
        private _proveedorService: SupplierService
    ) { }

    ngOnInit() { 
        this.crearFormPorveedor()
    }  

    crearFormPorveedor(){
        this.formProveedor = this._formBuildaer.group({
            ruc: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(11)]],
            name: [null, [Validators.required, Validators.maxLength(30)]],
            area: [null, [Validators.required, Validators.maxLength(30)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
        })
    }


    async registrarProveedor(){
        if(this.formProveedor.invalid){
            return
        }
        let form = this.formProveedor.value
        let Proveedor: any = {
            ruc: form.ruc,
            name: form.name,
            area: form.area,
            email: form.email,
        }
        try{
            let data = await this._proveedorService.registrarProveedores(Proveedor)
            this.modalClass = ' overflow-y-auto show'
        }
        catch (error) {
            console.log(error)
        }
    }

    modificarCSSModal() {
        this.modalClass = ''
    }

    cerrarVentana() {
        this._router.navigate(['/almacen/gestionarproveedor'])
    }


}