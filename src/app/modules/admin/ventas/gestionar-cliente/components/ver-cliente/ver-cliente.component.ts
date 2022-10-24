//import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente.service';


@Component({
    selector: 'app-ver-cliente',
    templateUrl: 'ver-cliente.component.html'
})

export class VerClienteComponent implements OnInit {

    idCliente: string
    formCliente: FormGroup

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _clienteService: ClienteService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.crearFormCliente()
        //this.listarClientexID()

        this._route.params.subscribe(params => {
            this.idCliente = params.id
            this.listarClientexID(this.idCliente)
        })
    }

    crearFormCliente() {
      this.formCliente = this._formBuilder.group({
          name: [null, []],
          documento: [null, []],
          phone: [null, []],
      })
  }

    async listarClientexID(idCliente: string) {
      try {
          const data: any = await this._clienteService.getClientxID(idCliente).toPromise()
          this.formCliente.patchValue(data.data.client)
      }
      catch (error) {
          console.log("Error: ", error)
      }
  }

    cerrarVentana() {
        this._router.navigate(['/ventas/gestionarcliente'])
    }
}