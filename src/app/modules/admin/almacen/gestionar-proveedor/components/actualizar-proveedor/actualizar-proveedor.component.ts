import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/core/services/supplier.service';


@Component({

    selector: 'app-actualizar-proveedor',
    templateUrl: 'actualizar-proveedor.component.html'
})

export class ActualizarProveedorComponent implements OnInit {

    idProveedor: string
    formProveedor: FormGroup
    modalClass: string = ''
  
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _proveedorService: SupplierService,
    ) { }

    ngOnInit() { 
        this.crearFormProveedor()

        this._route.params.subscribe(params => {
            this.idProveedor = params.id
           this.listarProveedorxID(this.idProveedor)
        })
    }  

    crearFormProveedor() {
        this.formProveedor = this._formBuilder.group({
            ruc: [null, []],
            name: [null, []],
            area: [null, []],
            email: [null, []]
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

        let form = this.formProveedor.value
        let Proveedor: any = {
            ruc: form.ruc,
            name: form.name,
            area: form.area,
            email: form.email,
        }

  try {
      let data = await this._proveedorService.actualizarProveedores(this.idProveedor, Proveedor)
      this.listarProveedorxID(this.idProveedor)
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
    



    

    