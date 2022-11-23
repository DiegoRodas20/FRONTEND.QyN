import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/core/models/response.model';
import { OrderVehicleService } from 'src/app/core/services/orderVehicle.service';

@Component({
  selector: 'app-asignacion-pedido-dialog',
  templateUrl: './asignacion-pedido-dialog.component.html',
  styleUrls: ['./asignacion-pedido-dialog.component.scss']
})
export class AsignacionPedidoDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<AsignacionPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData,
    private _router: Router,
    private _orderVehicleService: OrderVehicleService,
  ) { }

  ngOnInit(): void {

  }

  async eliminar() {
    let data: ResponseData = await this._orderVehicleService.eliminarAsignacionPedido(this._dialogData.id).toPromise()
    this._dialogRef.close(data.message)
  }
  verDetalle() {
    this._router.navigate(['/ventas/gestionarpedido/ver/' + this._dialogData.orderId])
    this._dialogRef.close()

  }

  salir() {
    this._dialogRef.close()
  }

}
