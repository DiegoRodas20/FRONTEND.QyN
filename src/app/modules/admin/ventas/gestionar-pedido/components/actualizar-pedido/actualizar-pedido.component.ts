import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus, UpdateOrder } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from 'src/app/shared/services/alert.service';


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
    formAsignacion: FormGroup
    formComentario: FormGroup
    actualStatus = 0;
    // Alert Modal
    typeModal: string
    openModal: boolean = false
    contenidoModal: string

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        private _formBuilder: FormBuilder,
        private _datePipe: DatePipe,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormPedido()
        this.crearFormCliente()
        this.crearFormAsignacion();

        this.listarEstadosPedido()
        this._route.params.subscribe(params => {
            this.idPedido = params.id
            this.listarPedidoxID(this.idPedido)
        })

    }
    crearFormAsignacion() {
        this.formAsignacion = this._formBuilder.group({
            date: [null, []],
            vehicleId: [null, []],
            typeVehicle: [null, []],
            plate: [null, []],
            brand: [null, []],
            color: [null, []],
            driverName: [null, []],
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
            this.actualStatus = data.data['orderStatusId'];

            let date = new Date(data.data['estimatedDate'])
            date.setDate(date.getDate() + 1);
            this.formPedido.controls['estimatedDate'].setValue(this._datePipe.transform(date, 'yyyy-MM-dd'))
            if (data.data['assignation']) {
                this.formAsignacion.patchValue(data.data['assignation'])
                this.formAsignacion.controls['date'].setValue(this._datePipe.transform(data.data['assignation']['date'], 'dd/MM/yyyy'))
            }
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

        try {
            let data: ResponseData = await this._orderService.actualizarPedido(this.idPedido, Pedido)

            if (!data.error) {

                let contenido: any = {
                    typeModal: 'success',
                    contenidoModal: data.message
                }

                this.listarPedidoxID(this.idPedido)
                this._alertService.openModal(contenido)
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
    asignarTransporte() {
        this._router.navigate(
            ['/transporte/asignartransporte'],
            { queryParams: { order: this.idPedido } }
        )
    }
}