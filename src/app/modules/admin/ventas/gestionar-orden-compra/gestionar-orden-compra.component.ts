import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestionar-orden-compra',
    templateUrl: 'gestionar-orden-compra.component.html'
})

export class GestionarOrdenCompraComponent implements OnInit {

    constructor(
      private _ordenCompraService: OrdenCompraService,
        private _router: Router,
    ) { }

    ngOnInit() {
      this.getOrdenesCompra()
    }

    lOrdenes: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    async getOrdenesCompra(){
      try {
          const data: any = await this._ordenCompraService.getOrdenesCompra().toPromise()
          this.Mensaje = data.message
          this.lOrdenes = data.data
      }
      catch (error) {
          console.error("Error: ", error)
      }
   }

}
