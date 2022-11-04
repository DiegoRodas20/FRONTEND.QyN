import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderVehicleService } from 'src/app/core/services/orderVehicle.service';

@Component({
  selector: 'app-registrar-pedidos-transporte',
  templateUrl: './registrar-pedidos-transporte.component.html',
  styleUrls: ['./registrar-pedidos-transporte.component.scss']
})
export class RegistrarPedidosTransporteComponent implements OnInit {

  pedidos = []
  formAsignacion: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<RegistrarPedidosTransporteComponent>,
    private _formBuilder: FormBuilder,
    private _orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) private _dialogData,
    private _orderVehicleService: OrderVehicleService,

  ) { }

  ngOnInit(): void {
    this.formAsignacion = this._formBuilder.group({
      pedidoId: [null, Validators.required],
      arrivalDate: [null, Validators.required],
    })
    this.listarPedidos()
  }

  async listarPedidos() {
    let data = await this._orderService.getPedidosToAssign().toPromise()
    this.pedidos = data.data;
  }

  async registrar() {

    if (this.formAsignacion.invalid) {
      return;
    }

    let values = this.formAsignacion.value;
    let data = {
      "orderId": values.pedidoId,
      "vehicleId": this._dialogData,
      "date": values.arrivalDate
    }

    try {
      await this._orderVehicleService.registrar(data)

      this._dialogRef.close('Register')
    } catch (error) {
      this._dialogRef.close('Error')
    }
  }

  salir() {
    this._dialogRef.close()
  }

  isInvalidForm() {
    return this.formAsignacion.invalid;
  }
}
