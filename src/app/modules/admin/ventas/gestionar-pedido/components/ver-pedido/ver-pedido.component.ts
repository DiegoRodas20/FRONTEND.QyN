import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    providers: [DatePipe],
    selector: 'app-ver-pedido',
    templateUrl: 'ver-pedido.component.html'
})

export class VerPedidoComponent implements OnInit {

    idPedido: string
    tipoDocumento: string
    lEstadosPedido: OrderStatus[] = []
    lProductosPedido: Product[] = []
    formPedido: FormGroup
    formCliente: FormGroup
    formAsignacion: FormGroup
    formComentario: FormGroup

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
        this.crearFormAsignacion()
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
            this.formPedido.controls['estimatedDate'].setValue(this._datePipe.transform(data.data['estimatedDate'], 'dd/MM/yyyy'))

            if (data.data['assignation']) {
                this.formAsignacion.patchValue(data.data['assignation'])
                this.formAsignacion.controls['date'].setValue(this._datePipe.transform(data.data['assignation']['date'], 'dd/MM/yyyy'))
            }
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    cerrarVentana() {
        this._router.navigate(['/ventas/gestionarpedido'])
    }
}