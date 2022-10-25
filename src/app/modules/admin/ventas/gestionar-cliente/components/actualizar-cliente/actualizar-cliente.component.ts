import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: 'actualizar-cliente.component.html'
})
export class ActualizarClienteComponent implements OnInit {
    
    idCliente: string
    formCliente: FormGroup
    modalClass: string = ''
  
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _clienteService: ClienteService,
        private _formBuilder: FormBuilder,
    ) { }
     

  ngOnInit() {
          this.crearFormCliente()

          this._route.params.subscribe(params => {
          this.idCliente = params.id
          this.listarClientexID(this.idCliente)
      })
  }

  crearFormCliente() {
        this.formCliente = this._formBuilder.group({
          address: [null, []],
        numberDocument: [null, []],
        phone: [null, []],
  })
}

  async listarClientexID(idCliente: string) {
    
    try {
        const data: any = await this._clienteService.getClientxID(idCliente).toPromise()
        console.log(data.data)
        this.formCliente.patchValue(data.data)
        }
    catch (error) {
        console.log("Error: ", error)
      }
  }

  async actualizarCliente() {

        let form = this.formCliente.value
        let Cliente: any = {
            address: form.address,
            numberDocument: form.numberDocument,
            phone: form.phone,
        }

  try {
      let data = await this._clienteService.actualizarCliente(this.idCliente, Cliente)
      console.log(data)
      //this.actualizarCliente()
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
      this._router.navigate(['/ventas/gestionarcliente'])
  }

}
