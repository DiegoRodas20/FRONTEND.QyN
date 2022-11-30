import { Component, Inject, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/core/models/supplier.model';
import { PurchaseOrderStatus } from 'src/app/core/models/purchaseOrder';
import { ProductoService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ver-orden-compra',
  templateUrl: 'ver-orden-compra.component.html'
})

export class VerOrdenCompraComponent implements OnInit {

  idOrdenCompra: string

  constructor(
    private _ordenCompraService: OrdenCompraService,
    private _productoService: ProductoService,
    private _supplierService: SupplierService,
    private _dialogRef: MatDialogRef<VerOrdenCompraComponent>,
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) private _dialogData,
  ) { }

  ngOnInit() {

    this.idOrdenCompra = this._dialogData
    this.getInitalData().then(() => {
      this.getOrdenCompraxID(this.idOrdenCompra)
    })
    this.formOrdenCompra = this._formBuilder.group({
      id: [null, []], supplierData: this._formBuilder.group({
        id: [null, []],
        ruc: [null, []],
        name: [null, []],
        area: [null, []],
        email: [null, []]
      }), arrivalDate: [null, []], comments: [null, []], purchaseOrderStatusId: [null, []], purchaseOrderDetails: [null, []]
    })

    this.getProductList()
  }

  ordenCompraData: Object
  Mensaje: string
  filtro = new FormControl();
  estadosOrdenesCompra: [];
  lProducts: Product[] = []
  listaSupplier: [];
  p: number = 1;

  formOrdenCompra: FormGroup

  async getOrdenCompraxID(idOrdenCompra: string) {
    try {
      const data: any = await this._ordenCompraService.gestOrdenCompraxID(idOrdenCompra).toPromise()
      this.Mensaje = data.message
      this.formOrdenCompra.patchValue({
        ...data.data,
        supplierData: this.getPurchaseOrderSupplierData(data.data.supplierId),
        purchaseOrderStatusId: this.getPurchaseOrderStatusName(data.data.purchaseOrderStatusId)
      })

      let date = new Date(data.data['arrivalDate'])
      let dateString = this._datePipe.transform(date, 'dd/MM/yyyy')
      this.formOrdenCompra.controls['arrivalDate'].setValue(dateString)
    }
    catch (error) {
      console.error("Error: ", error)
    }
  }

  async getStatusPurchaseOrder() {
    try {
      const data: any = await this._ordenCompraService.getEstadosOrdenCompra().toPromise()
      this.estadosOrdenesCompra = data.data
    }
    catch (error) {
      console.error("Error : ", error)
    }
  }

  async getSuppliers() {
    try {
      const data: any = await this._supplierService.getSuppliers().toPromise()
      this.listaSupplier = data.data
    }
    catch (error) {
      console.error("Error : ", error)
    }
  }

  async getInitalData() {
    await this.getSuppliers();
    await this.getStatusPurchaseOrder();
  }

  getPurchaseOrderStatusName(idEstadoOrdenCompra) {
    let estadoOrdenCompra: PurchaseOrderStatus
    estadoOrdenCompra = this.estadosOrdenesCompra.find(({ id }) => id === idEstadoOrdenCompra)
    return estadoOrdenCompra.name
  }

  getPurchaseOrderSupplierData(idSupplierOrdenCompra) {
    let supplierOrdenCompra: Supplier
    supplierOrdenCompra = this.listaSupplier.find(({ id }) => id === idSupplierOrdenCompra)
    return supplierOrdenCompra
  }

  getProductList() {
    this._productoService.getProductos().subscribe((res) => {
      this.lProducts = res.data
      console.log(this.lProducts)
    })
  }

  getNameProduct(idProduct: number) {
    let productData: Product
    productData = this.lProducts.find(({ id }) => id == idProduct)
    return productData
  }

  salir() {
    this._dialogRef.close()
  }

}
