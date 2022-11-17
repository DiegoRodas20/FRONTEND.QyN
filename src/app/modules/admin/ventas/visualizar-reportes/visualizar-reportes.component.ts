import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-visualizar-reportes',
  templateUrl: './visualizar-reportes.component.html',
  styleUrls: ['./visualizar-reportes.component.scss']
})
export class VisualizarReportesComponent implements OnInit {
  public pedidosChart: any;
  pedidosMensaje: string = '';
  public puntuacionChart: any;
  puntuacionMensaje: string = '';

  constructor(
    private _orderService: OrderService,
  ) { }

  async ngOnInit(): Promise<void> {
    Promise.all([
      await this.getPedidosEntregados(),
      await this.getPuntuacionPedidos()
    ])
  }

  async getPedidosEntregados() {

    try {
      const data: ResponseData = await this._orderService.getPedidosEntregados().toPromise()
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

  async getPuntuacionPedidos() {

    try {
      const data: ResponseData = await this._orderService.getPedidosPuntuacion().toPromise()
      this.puntuacionMensaje = data.message
      this.createChartPuntuacionPedidos(data.data)
    }
    catch (error) {
      console.log("Error: ", error)
    }

  }

  createChartPuntuacionPedidos(pedidosPorPuntuacion) {

    let labels: string[] = [];
    let cantidad: number[] = [];
    pedidosPorPuntuacion.forEach(element => {
      labels.push(element.punctuation);
      cantidad.push(element.quantity);

    });
    this.puntuacionChart = new Chart("puntuacionChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: labels,
        datasets: [{
          data: cantidad,
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
