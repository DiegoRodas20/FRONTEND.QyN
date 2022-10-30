import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
    selector: 'app-gestionar-proveedor',
    templateUrl: 'gestionar-proveedor.component.html'
})

export class GestionarProveedorComponent implements OnInit {

    lProveedores: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _proveedorService: SupplierService,
        private _router: Router,
    ) { }

    ngOnInit() {    
        this.getProveedor()
    }

    async getProveedor(){
        try {
            const data: any = await this._proveedorService.getProveedores().toPromise()
            this.Mensaje = data.message
            this.lProveedores = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
     }

     registrarProveedor(){
        this._router.navigate(['/almacen/gestionarproveedores/registrar'])
     }
     verProveedor(idProveedor: string){
        this._router.navigate(['/almacen/gestionarproveedores/ver/' + idProveedor])
     }
     actualizarProveedor(idProveedor: string){
        this._router.navigate(['/almacen/gestionarproveedores/actualizar/' + idProveedor])
     }

}