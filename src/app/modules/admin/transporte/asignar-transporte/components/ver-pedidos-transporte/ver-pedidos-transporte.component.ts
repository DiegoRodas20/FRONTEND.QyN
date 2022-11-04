import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderVehicleService } from 'src/app/core/services/orderVehicle.service';
import { RegistrarPedidosTransporteComponent } from '../registrar-pedidos-transporte/registrar-pedidos-transporte.component';

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

  constructor(
    private _route: ActivatedRoute,
    private _orderVehicleService: OrderVehicleService,
    private _dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.idVehiculo = params.id;
      this.listarPedidos(this.idVehiculo);
    })
  }

  async listarPedidos(vehiculoId: number) {
    let data = await this._orderVehicleService.getPedidosPorVehiculoId(vehiculoId).toPromise();
    this.pedidos = data.data
  }

  async eliminar(id: number) {
    let data: ResponseData = await this._orderVehicleService.eliminarAsignacionPedido(id).toPromise()

    if (!data.error) {

      this.modalClass = ' overflow-y-auto show'
      this.mensaje = "Se elimino correctamente."
      await this.listarPedidos(this.idVehiculo);
    }

  }

  modificarCSSModal() {
    this.modalClass = ''
  }

  openCreateOrderVehicle(): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']
    dialogConfig.data = this.idVehiculo;

    const dialogReg = this._dialog.open(RegistrarPedidosTransporteComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(async result => {

      await this.listarPedidos(this.idVehiculo);
      if (result == 'Register') {
        this.modalClass = ' overflow-y-auto show'
        this.mensaje = "Se registro correctamente."       
      }
    })
  }
}
