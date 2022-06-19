import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/core/services/pedido.service';


@Component({
    selector: 'app-gestionar-pedido',
    templateUrl: 'gestionar-pedido.component.html'
})

export class GestionarPedidoComponent implements OnInit {

    lPedidos: any[] = []
    Mensaje: string

    constructor(
        private _pedidoService: PedidoService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.getPedidos()
    }

    async getPedidos() {

        try {

            const data: any = await this._pedidoService.getPedidos().toPromise()
            console.log(data)

            this.Mensaje = data.message
            this.lPedidos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }
}