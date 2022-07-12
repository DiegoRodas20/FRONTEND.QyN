import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/core/services/pedido.service';


@Component({
    selector: 'app-gestionar-pedido',
    templateUrl: 'gestionar-pedido.component.html'
})

export class GestionarPedidoComponent implements OnInit {

    lPedidos: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;


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
            this.Mensaje = data.message
            this.lPedidos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

    verPedido(idPedido: string) {
        this._router.navigate(['/ventas/gestionarpedido/ver/' + idPedido])
    }

    actualizarPedido(idPedido: string){
        this._router.navigate(['/ventas/gestionarpedido/actualizar/' + idPedido])
    }
}