import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-visualizar-movimientos',
  templateUrl: './visualizar-movimientos.component.html',
  styleUrls: ['./visualizar-movimientos.component.scss']
})

export class VisualizarMovimientosComponent implements OnInit {

  movimientos = []
  mensaje = "";
  idProducto: number = 0;
  nameProducto: string

  p: number = 1;

  constructor(
    private _productoService: ProductoService,
    private _dialogRef: MatDialogRef<VisualizarMovimientosComponent>,

    @Inject(MAT_DIALOG_DATA) private _dialogData,
  ) { }

  ngOnInit(): void {

    this.idProducto = this._dialogData.idProducto
    this.nameProducto = this._dialogData.nameProducto
    this.listarMovimientos(this.idProducto)
  }

  async listarMovimientos(idProducto: number) {
    let data = await this._productoService.getMovimientosProductos(idProducto).toPromise();
    console.log(data)
    this.movimientos = data.data
    this.mensaje = data.message
  }

  salir() {
    this._dialogRef.close()
  }
}
