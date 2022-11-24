import { Component, OnInit } from '@angular/core';
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
  producto;
  p: number = 1;
  modalClass: string = ''

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.idProducto = params.id;
      this.listarMovimientos(this.idProducto);
      this.listarProductoxID(String(this.idProducto));
    })
  }

  async listarMovimientos(idProducto: number) {
    let data = await this._productoService.getMovimientosProductos(idProducto).toPromise();
    this.movimientos = data.data
    this.mensaje = data.message
  }

  async listarProductoxID(idProducto: string) {
    try {
        const data: ResponseData = await this._productoService.getProductoxID(idProducto).toPromise()
        this.producto= data.data;
    }
    catch (error) {
        console.log("Error: ", error)
    }
}
}
