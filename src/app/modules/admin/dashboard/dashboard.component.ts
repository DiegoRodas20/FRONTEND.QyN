import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientService } from 'src/app/core/services/client.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductoService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {


    lUser: any[] = []
    lUserActive: any[] = []
    lUserInactive: any[] = []

    lClient: any[] = []

    lProduct: any[] = []
    lProductInCatalog: any[] = []
    lProductOutCatalog: any[] = []

    lPedido: any[] = []
    lPedidoEstados: any[] = []

    lPurchaseOrder: any[] = []
    lPurchaseOrderEstados: any[] = []

    public pedidosChart: any;
    pedidosMensaje: string = '';
    public puntuacionChart: any;
    puntuacionMensaje: string = '';

    constructor(
        private _userService: UserService,
        private _clientService: ClientService,
        private _productService: ProductoService,
        private _orderService: OrderService,
        private _purchaseOrderService: OrdenCompraService,
        private _dashboardService: DashboardService
    ) { }

    async ngOnInit(): Promise<void> {
        Promise.all([
            await this.getPedidosEntregados()
        ])

        this.getUsuariosTotal()
        this.getClientes()
        this.getProductos()
        this.getPedidos()
        this.getPurchaseOrder()
        this.getDataDashboard()
    }


    async getPedidosEntregados() {

        try {
            const data: any = await this._orderService.getPedidosEntregados().toPromise()
            this.pedidosMensaje = data.message
            this.createChartPedidosEntregados(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

    createChartPedidosEntregados(pedidosPorMes) {

        let labels: string[] = [];
        let dataPedidosEntregadosATiempo: number[] = [];
        let dataPedidosFueraDeTiempo: number[] = [];
        pedidosPorMes.forEach(element => {
            labels.push(element.month);
            dataPedidosEntregadosATiempo.push(element.quantityDeliveredInTime);
            dataPedidosFueraDeTiempo.push(element.quantityDeliveredOutOfTime);

        });
        this.pedidosChart = new Chart("pedidosChart", {
            type: 'bar', //this denotes tha type of chart

            data: {// values on X-Axis
                labels: labels,
                datasets: [
                    {
                        label: "Entregados a tiempo",
                        data: dataPedidosEntregadosATiempo,
                        backgroundColor: '#062B61'
                    },
                    {
                        label: "Entregados fuera de tiempo",
                        data: dataPedidosFueraDeTiempo,
                        backgroundColor: 'limegreen'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }
        });
    }

    async getDataDashboard() {

        try {
            const data: any = await this._dashboardService.getDataDashboard().toPromise()
            this.lPedidoEstados = data.data.order.orderByState
            this.lPurchaseOrderEstados = data.data.purchaseOrder.purchaseOrderByState
            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async getUsuariosTotal() {

        try {
            const data: any = await this._userService.getUsuarios().toPromise()
            this.lUser = data.data
            this.lUserActive = this.lUser.filter(value => value.isActive)
            this.lUserInactive = this.lUser.filter(value => !value.isActive)

            // console.log(activeUser)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async getClientes() {

        try {
            const data: any = await this._clientService.getClientes().toPromise()
            this.lClient = data.data
            this.lClient.filter(value => { })
            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async getProductos() {

        try {
            const data: any = await this._productService.getProductos().toPromise()
            this.lProduct = data.data
            this.lProductInCatalog = this.lProduct.filter(value => value.showInCatalog)
            this.lProductOutCatalog = this.lProduct.filter(value => !value.showInCatalog)

            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async getPedidos() {

        try {
            const data: any = await this._orderService.getPedidos().toPromise()
            this.lPedido = data.data
            // this.lProductInCatalog = this.lProduct.filter(value => value.showInCatalog)
            // this.lProductOutCatalog = this.lProduct.filter(value => !value.showInCatalog)

            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async getPurchaseOrder() {

        try {
            const data: any = await this._purchaseOrderService.getOrdenesCompra().toPromise()
            this.lPurchaseOrder = data.data
            // this.lProductInCatalog = this.lProduct.filter(value => value.showInCatalog)
            // this.lProductOutCatalog = this.lProduct.filter(value => !value.showInCatalog)

            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    recargarData() {

    }








}