import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    selector: 'app-gestionar-pedido',
    templateUrl: 'gestionar-pedido.component.html'
})

export class GestionarPedidoComponent implements OnInit {

    lPedidos: Order[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _orderService: OrderService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.getPedidos()
    }

    async getPedidos() {

        try {
            const data: ResponseData = await this._orderService.getPedidos().toPromise()
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

    actualizarPedido(idPedido: string) {
        this._router.navigate(['/ventas/gestionarpedido/actualizar/' + idPedido])
    }

    colorStatusPedido(orderstatus: number) {

        switch (orderstatus) {
            case 1:
                return 'text-primary'
                break;
            case 2:
                return 'text-danger'
                break;
            case 3:
                return 'text-success'
                break;
            case 4:
                return 'text-success'
                break;
            case 5:
                return 'text-warning'
                break;
            case 6:
                return 'text-secondary'
                break;
            case 7:
                return 'text-dark'
                break;
            default:
                return ''
                break;
        }
    }

    iconStatusPedido(orderstatus: number) {
        switch (orderstatus) {
            case 1:
                return 'file-plus-2'
                break;
            case 2:
                return 'package-x'
                break;
            case 3:
                return 'check-square'
                break;
            case 4:
                return 'check-square'
                break;
            case 5:
                return 'package-plus'
                break;
            case 6:
                return 'baggage-claim'
                break;
            case 7:
                return 'package-check'
                break;
            default:
                return ''
                break;
        }
    }
}