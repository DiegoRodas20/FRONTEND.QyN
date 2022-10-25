import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus, UpdateOrder } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    providers: [DatePipe],
    selector: 'app-actualizar-pedido',
    templateUrl: 'actualizar-pedido.component.html'
})

export class ActualizarPedidoComponent implements OnInit {

    idPedido: string
    tipoDocumento: string
    lEstadosPedido: OrderStatus[] = []
    lProductosPedido: Product[] = []
    formPedido: FormGroup
    formCliente: FormGroup

    // Alert Modal
    typeModal: string
    openModal: boolean = false
    contenidoModal: string

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _orderService: OrderService,
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
            orderStatusId: [null, []],
            estimatedDate: [null, []],
            address: [null, []],
            comments: [null, []]
        })
    }

    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            name: [null, []],
            typeDocument: [null, []],
            numberDocument: [null, []],
            area: [null, []],
            phone: [null, []],
            email: [null, []],
        })
    }

    async listarEstadosPedido() {

        try {
            const data: ResponseData = await this._orderService.getEstadosPedido().toPromise()
            this.lEstadosPedido = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

    async listarPedidoxID(idPedido: string) {
        try {
            const data: ResponseData = await this._orderService.getPedidoxID(idPedido).toPromise()

            this.lProductosPedido = data.data['orderDetails']
            this.tipoDocumento = data.data['client'].typeDocument
            this.formCliente.patchValue(data.data['client'])
            this.formPedido.patchValue(data.data)
            let date = new Date(data.data['estimatedDate'])
            date.setDate(date.getDate() + 1);
            this.formPedido.controls['estimatedDate'].setValue(this._datePipe.transform(date, 'yyyy-MM-dd'))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async actualizarPedido() {

        let form = this.formPedido.value
        
        console.log(form)

        let Pedido: UpdateOrder = {
            id: 0,
            comments: form.comments,
            address: form.address,
            statusId: Number(form.orderStatusId),
            estimatedDate: (form.estimatedDate)
        }

        console.log(Pedido)

        try {
            let data: ResponseData = await this._orderService.actualizarPedido(this.idPedido, Pedido)

            if (!data.error) {

                let contenido: any = {
                    type: 'success',
                    text: data.message
                }

                this.listarPedidoxID(this.idPedido)
                this.onOpenModal(contenido)
            }
        }
        catch (error) {
            console.log(error)

            let contenido: any = {
                type: 'error',
                text: error
            }
            this.onOpenModal(contenido)
        }

    }

    onOpenModal(contenido: any) {
        this.openModal = true
        this.typeModal = contenido.type
        this.contenidoModal = contenido.text
    }

    onCloseModal(event: boolean) {
        this.openModal = event
    }

    cerrarVentana() {
        this._router.navigate(['/ventas/gestionarpedido'])
    }
}