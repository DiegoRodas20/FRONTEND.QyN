import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderVehicleService } from 'src/app/core/services/orderVehicle.service';
import { RegistrarPedidosTransporteComponent } from '../registrar-pedidos-transporte/registrar-pedidos-transporte.component';
import esLocale from '@fullcalendar/core/locales/es';
import { AsignacionPedidoDialogComponent } from '../asignacion-pedido-dialog/asignacion-pedido-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-ver-pedidos-transporte',
  templateUrl: './ver-pedidos-transporte.component.html',
  styleUrls: ['./ver-pedidos-transporte.component.scss']
})

export class VerPedidosTransporteComponent implements OnInit {

  mensaje = "";
  idVehiculo: number = 0;
  pedidos: any[] = [];
  p: number = 1;
  modalClass: string = ''
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    droppable: true,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    height: '42rem',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      meridiem: 'short',
    },

    locale: esLocale,
    events: [],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    eventClick: (e) => {
      this.verDetalleDePedido(e.event._def.extendedProps.data)
    },
    dateClick: (e) => {
      this.openCreateOrderVehicle(e)
    }
  };

  orderId: number = null;
  constructor(
    private _route: ActivatedRoute,
    private _orderVehicleService: OrderVehicleService,
    private _dialog: MatDialog,
    private _alertService: AlertService,

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.idVehiculo = params.id;
      this.listarPedidos(this.idVehiculo);
    })
    this._route.queryParams.subscribe(params => {
      this.orderId = isNaN(params.order) ? null : Number(params.order);
    })
  }

  async listarPedidos(vehiculoId: number) {
    let data = await this._orderVehicleService.getPedidosPorVehiculoId(vehiculoId).toPromise();
    this.pedidos = data.data
    this.calendarOptions.events = [...this.pedidos.map(item => { return { title: item.orderId + ' - ' + item.clientName, date: new Date(item.arrivalDate).setDate(new Date(item.arrivalDate).getDate() + 1), data: item } })]
  }

  verDetalleDePedido(orderVehicle: any) {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.data = orderVehicle;

    const dialogReg = this._dialog.open(AsignacionPedidoDialogComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(async result => {

      await this.listarPedidos(this.idVehiculo);
      if (result) {
        this._alertService.openModal({ typeModal: 'success', contenidoModal: result })
      }
    })
  }

  openCreateOrderVehicle(fecha): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.data = { idVehiculo: this.idVehiculo, date: fecha?.dateStr, idPedido: this.orderId };

    const dialogReg = this._dialog.open(RegistrarPedidosTransporteComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(async result => {

      await this.listarPedidos(this.idVehiculo);
      if (result == 'Register') {
        this._alertService.openModal({ typeModal: 'success', contenidoModal: "Se registro correctamente." })
      }
    })
  }
}
