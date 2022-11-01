import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { ProductoService } from 'src/app/core/services/product.service';
import { VerProductoComponent } from './ver-producto/ver-producto.component';

@Component({
    selector: 'app-gestionar-producto',
    templateUrl: 'gestionar-producto.component.html'
})

export class GestionarProductoComponent implements OnInit {

    lProductos: Product[] = []
    Mensaje: string
    urlPorDefecto: string = '../../../../../assets/images/productodefault.jpg'
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _productoService: ProductoService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getProductos()
    }

    async getProductos() {

        try {
            const data: ResponseData = await this._productoService.getProductos().toPromise()

            this.Mensaje = data.message
            this.lProductos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

    registrarProducto() { }

    actualizarProducto(idProducto: number) { }

    verProducto(idProducto: number) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']
        dialogConfig.data = idProducto

        console.log(dialogConfig.data)
        const dialogReg = this._dialog.open(VerProductoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => console.log(result))
    }

}