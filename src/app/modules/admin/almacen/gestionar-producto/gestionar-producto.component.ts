import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { ProductoService } from 'src/app/core/services/product.service';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { VisualizarMovimientosComponent } from './visualizar-movimientos/visualizar-movimientos.component';

@Component({
    selector: 'app-gestionar-producto',
    templateUrl: 'gestionar-producto.component.html'
})

export class GestionarProductoComponent implements OnInit {

    lProductos: Product[] = []
    Mensaje: string
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

    registrarProducto() {
        const dialogConfig = new MatDialogConfig()
        
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(RegistrarProductoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getProductos())
    }

    actualizarProducto(idProducto: number) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = idProducto
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(ActualizarProductoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(
            result =>
                this.getProductos()
        )
    }

    verProducto(idProducto: number) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = idProducto
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(VerProductoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => console.log(result))
    }

    verProductoMovimientos(idProducto: number, nameProducto: string) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = { idProducto, nameProducto }
        dialogConfig.width = '80rem'

        const dialogReg = this._dialog.open(VisualizarMovimientosComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getProductos())
    }

}