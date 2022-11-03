import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
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
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuildaer: FormBuilder,
        private _proveedorService: SupplierService,
    ) { }

    

    ngOnInit() { 
        this.crearFormProveedor()
        this._route.params.subscribe(params => {
            this.idProveedor = params.id
           this.listarProveedorxID(this.idProveedor)
        })
    }  

    crearFormProveedor(){
        this.formProveedor= this._formBuildaer.group ({
            ruc: [null, []],
            name: [null, []],
            area: [null, []],
            email: [null, []],
        })
    }

    async listarProveedorxID(idProveedor: string){
        try {
            const data : any = await this._proveedorService.getProveedoresxID(idProveedor).toPromise()
            console.log (data.data)
            this.formProveedor.patchValue(data.data)
            
        }
        catch (error){
            console.log("Error: ",error)
        }
    }

    
    cerrarVentana() {
        this._router.navigate(['/almacen/gestionarproveedor'])
    }
}