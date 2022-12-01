import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseOrder } from 'src/app/core/models/purchaseOrder';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrearOrdenCompraComponent } from './crear-orden-compra/crear-orden-compra.component';
import { VerOrdenCompraComponent } from './ver-orden-compra/ver-orden-compra.component';
import { ActualizarOrdenCompraComponent } from './actualizar-orden-compra/actualizar-orden-compra.component';

@Component({
  selector: 'app-gestionar-orden-compra',
  templateUrl: 'gestionar-orden-compra.component.html'
})

export class GestionarOrdenCompraComponent implements OnInit {

  constructor(
    private _ordenCompraService: OrdenCompraService,
    private _router: Router,
    public createPurchaseOrderDialog: MatDialog,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getOrdenesCompra()
  }

  lOrdenes: PurchaseOrder[] = []
  Mensaje: string
  filtro = new FormControl();
  p: number = 1;

  async getOrdenesCompra() {
    try {
      const data: any = await this._ordenCompraService.getOrdenesCompra().toPromise()
      this.Mensaje = data.message
      this.lOrdenes = data.data
    }
    catch (error) {
      console.error("Error: ", error)
    }
  }

  openCreatePurchaseOrderDialog(): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '60rem'

    const dialogReg = this._dialog.open(CrearOrdenCompraComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(result => {
      this.getOrdenesCompra()
    })
  }

  moveToVerOrdenCompra(idOrdenCompra) {

    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '60rem'
    dialogConfig.data = idOrdenCompra

    const dialogReg = this._dialog.open(VerOrdenCompraComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(result => { })

    // this._router.navigate(['/ventas/gestionarOrdenCompra/ver/' + idOrdenCompra])
  }

  moveToUpdateOrdenCompra(idOrdenCompra) {

    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '60rem'
    dialogConfig.data = idOrdenCompra

    const dialogReg = this._dialog.open(ActualizarOrdenCompraComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(result => this.getOrdenesCompra())

    // this._router.navigate(['/ventas/gestionarOrdenCompra/actualizar/' + idOrdenCompra])
  }

  colorStatusPedido(orderstatus: number) {

    switch (orderstatus) {
      case 1:
        return 'bg-primary'
        break;
      case 2:
        return 'bg-success'
        break;
      case 3:
        return 'bg-danger'
        break;
      case 4:
        return 'bg-slate-500'
        break;
      case 5:
        return 'bg-dark'
        break;
      default:
        return ''
        break;
    }
  }

  iconStatusPedido(orderstatus: number) {
    switch (orderstatus) {
      case 1:
        return 'file-plus-2'
        break;
      case 2:
        return 'file-input'
        break;
      case 3:
        return 'file-x-2'
        break;
      case 4:
        return 'file-check-2'
        break;
      case 5:
        return 'file-output'
        break;
      default:
        return ''
        break;
    }
  }

}
