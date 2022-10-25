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
  codeProducto: string;
  nameProducto: string;
  salesPriceProducto: number;
  purcharsePriceProducto: number;
  categoryIdProducto: number;
  minStockProducto: number;
  maxStockProducto: number;
  stockProducto: number;
  showInCatalogProducto: boolean;
  urlImageProducto: string;
  categoryId: number;
  statusProducto: string;

  lCategorias: any[] = [];
  lEstadosProducto: any[] = ['Activo', 'Inactivo'];

  constructor(private _productoService: ProductoService) {}

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
  }

  async getCategorias() {
    try {
      const data: any = await this._productoService.getCategorias().toPromise();
      console.log(data);
      this.Mensaje = data.message;
      this.lCategorias = data.data;
    } catch (error) {
      console.log('Error: ', error);
    }
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

  async registrarProducto(codigo: string,nombre: string, tipo: string) {
    try {
      console.log(
        'registrarProducto: ' + codigo + ' ' + nombre + ' ' + tipo
      );
      var idTipo = 0;
      const categorys: any = await this._productoService.getCategorias().toPromise();
      for (let i = 0; i < categorys.data.length; i++) {
        if (categorys.data[i].name == tipo) {
          idTipo = categorys.data[i].id;
        }
      }
      //register
      let Producto: any={
        code: codigo,
        name: nombre,
        salesPrice: 0,
        purcharsePrice: 0,
        categoryId: idTipo,
        minStock: 0,
        maxStock: 1,
        stock: 0,
        showInCatalog: true,
        urlImage: '',
      }
      console.log(Producto);
      await this._productoService.postProducto(Producto).toPromise();
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
      this.idProducto = data.data.id;
      this.codeProducto = data.data.code;
      this.nameProducto = data.data.name;
      this.salesPriceProducto = data.data.salesPrice;
      this.purcharsePriceProducto = data.data.purcharsePrice;
      this.categoryIdProducto = data.data.categoryId;
      this.minStockProducto = data.data.minStock;
      this.maxStockProducto = data.data.maxStock;
      this.stockProducto = data.data.stock;
      this.showInCatalogProducto = data.data.showInCatalog;
      this.urlImageProducto = data.data.urlImage;
      const categorys: any = await this._productoService.getCategorias().toPromise();
      for (let i = 0; i < categorys.data.length; i++) {
        if (categorys.data[i].id == data.data.categoryId) {
          this.categoryId = categorys.data[i].name;
        }
      }
      if (data.data.showInCatalog == true) {
        this.statusProducto = 'Activo';
      } else {
        this.statusProducto = 'Inactivo';
      }
      this.Mensaje = data.message;
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
      var idTipo = 0;
      const categorys: any = await this._productoService.getCategorias().toPromise();
      for (let i = 0; i < categorys.data.length; i++) {
        if (categorys.data[i].name == tipo) {
          idTipo = categorys.data[i].id;
        }
      }
      var estadoBool = false;
      if (estado == 'Activo') {
        estadoBool = true;
      } else {
        estadoBool = false;
      }
      let Producto: any={
        code: this.codeProducto,
        name: nombre,
        salesPrice: this.salesPriceProducto,
        purcharsePrice: this.purcharsePriceProducto,
        categoryId: idTipo,
        minStock: this.minStockProducto,
        maxStock: this.maxStockProducto,
        stock: this.stockProducto,
        showInCatalog: estadoBool,
        urlImage: this.urlImageProducto,
      }
      console.log(Producto);
      await this._productoService.putProducto(idProducto, Producto).toPromise();
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

  //<p *ngIf="(nota>=9 && asignatura=='matematicas') || (edad==16)">estudia aeronautica</p>
}
