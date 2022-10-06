import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/core/services/pedido.service';


@Component({
    providers: [DatePipe],
    selector: 'app-ver-pedido',
    templateUrl: 'ver-pedido.component.html'
})

export class VerPedidoComponent implements OnInit {

    idPedido: string
    lEstadosPedido: any[] = []
    lProductosPedido: any[] = []
    formPedido: FormGroup
    formCliente: FormGroup

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _pedidoService: PedidoService,
        private _formBuilder: FormBuilder,
        private _datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.crearFormPedido()
        this.crearFormCliente()
        this.listarEstadosPedido()

        this._route.params.subscribe(params => {
            this.idPedido = params.id
            this.listarPedidoxID(this.idPedido)
        })

    }

    crearFormPedido() {
        this.formPedido = this._formBuilder.group({
            status: [null, []],
            estimatedDate: [null, []],
            address: [null, []],
            comments: [null, []]
        })
    }

    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            name: [null, []],
            ruc: [null, []],
            area: [null, []],
            phone: [null, []],
            email: [null, []],
        })
    }

    async listarEstadosPedido() {

        try {
            const data: any = await this._pedidoService.getEstadosPedido().toPromise()
            this.lEstadosPedido = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

    async listarPedidoxID(idPedido: string) {
        try {
            const data: any = await this._pedidoService.getPedidoxID(idPedido).toPromise()

            this.lProductosPedido = data.data.orderDetails
            this.formCliente.patchValue(data.data.client)
            this.formPedido.patchValue(data.data)
            this.formPedido.controls['estimatedDate'].setValue(this._datePipe.transform(data.data.estimatedDate,'dd/MM/yyyy'))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    cerrarVentana() {
        this._router.navigate(['/ventas/gestionarpedido'])
    }
}