import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    })
  }

  async listarMovimientos(idProducto: number) {
    let data = await this._productoService.getMovimientosProductos(idProducto).toPromise();
    this.movimientos = data.data
    this.mensaje = data.message
  }

}
