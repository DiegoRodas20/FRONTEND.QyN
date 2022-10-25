import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: 'gestionar-producto.component.html',
})
export class GestionarProductoComponent implements OnInit {
  lProductos: any[] = [];
  Mensaje: string;
  dataProducto: any[] = [];
  idProducto: string;
  constructor(private _productoService: ProductoService) {}

  ngOnInit() {
    this.getProductos();
  }

  async getProductos() {
    try {
      const data: any = await this._productoService.geProductos().toPromise();
      console.log(data);

      this.Mensaje = data.message;
      this.lProductos = data.data;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async registrarProducto(nombre: string, tipo: string, estado: string) {
    try {
      console.log(
        'Nombre del Producto: ' +
          nombre +
          '\nTipo: ' +
          tipo +
          '\nEstado: ' +
          estado
      );
      //register
      this.getProductos();
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  async verProducto(idProducto: string) {
    console.log('verProducto: ' + idProducto);
    try {
      const data: any = await this._productoService
        .getProductoxID(idProducto)
        .toPromise();
      console.log(data);
      this.Mensaje = data.message;
      this.dataProducto = data;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  async editarProducto(
    idProducto: string,
    nombre: string,
    tipo: string,
    estado: string
  ) {
    console.log(idProducto + ' ' + nombre + ' ' + tipo + ' ' + estado);
    try {
      //edit
      this.getProductos();
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  eliminarProducto(idProducto: string) {
    console.log(idProducto);
    try {
      this.idProducto = idProducto;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  eliminarProductoConfirm() {
    console.log(this.idProducto);
    try {
      //delete
      this.getProductos();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  stateName = true;
  editLockedName() {
    this.stateName = !this.stateName;
  }
  stateType = true;
  editLockedType() {
    this.stateType = !this.stateType;
  }
  stateState = true;
  editLockedState() {
    this.stateState = !this.stateState;
  }
}
