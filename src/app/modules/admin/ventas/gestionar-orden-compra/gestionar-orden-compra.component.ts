import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseOrder } from 'src/app/core/models/purchaseOrder';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CrearOrdenCompraComponent } from './crear-orden-compra/crear-orden-compra.component';

@Component({
    selector: 'app-gestionar-orden-compra',
    templateUrl: 'gestionar-orden-compra.component.html'
})

export class GestionarOrdenCompraComponent implements OnInit {

    constructor(
      private _ordenCompraService: OrdenCompraService,
        private _router: Router,
        public createPurchaseOrderDialog:MatDialog,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
      this.getOrdenesCompra()
    }

    lOrdenes: PurchaseOrder[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    async getOrdenesCompra(){
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

    dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']

    const dialogReg = this._dialog.open(CrearOrdenCompraComponent, dialogConfig)
    dialogReg.afterClosed().subscribe(result => {
      if(result != undefined && result.error == null){
        this.getOrdenesCompra()
      }
    })
   }

   moveToVerOrdenCompra(idOrdenCompra){
    this._router.navigate(['/ventas/gestionarOrdenCompra/ver/'+idOrdenCompra])
   }

   moveToUpdateOrdenCompra(idOrdenCompra){
    this._router.navigate(['/ventas/gestionarOrdenCompra/actualizar/'+idOrdenCompra])
   }

}
