import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/core/models/supplier.model';
import { PurchaseOrderStatus } from 'src/app/core/models/purchaseOrder';
import { ProductoService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';


@Component({
  selector: 'app-actualizar-orden-compra',
  templateUrl: './actualizar-orden-compra.component.html'
})

export class ActualizarOrdenCompraComponent implements OnInit {

  idOrdenCompra: string

  datePicker: any
  constructor(
    private _ordenCompraService: OrdenCompraService,
    private _supplierService: SupplierService,
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idOrdenCompra = params.id
      this.getProductList()
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
    })
  }

  ordenCompraData: Object
  Mensaje: string
  filtro = new FormControl();
  estadosOrdenesCompra: PurchaseOrderStatus[];
  listaSupplier: [];
  p: number = 1;
  lProducts: Product[] = []

  formOrdenCompra: FormGroup

  async getOrdenCompraxID(idOrdenCompra: string) {
    try {
      const data: any = await this._ordenCompraService.gestOrdenCompraxID(idOrdenCompra).toPromise()
      this.Mensaje = data.message
      this.formOrdenCompra.patchValue({ ...data.data, supplierData: this.getPurchaseOrderSupplierData(data.data.supplierId), arrivalDate: this.formatDateControl(data.data.arrivalDate) })
      this.datePicker = data.data.arrivalDate
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

  formatDateControl(date: string) {
    let newDate = new Date(date)
    return newDate.toISOString().split('T')[0]
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

  getProductList() {
    this._productoService.getProductos().subscribe((res) => {
      this.lProducts = res.data
    })
  }

  updateOrdenCompra() {
    let updateOrden = {
      id: this.idOrdenCompra,
      arrivalDate: new Date(this.formOrdenCompra.value.arrivalDate),
      comments: this.formOrdenCompra.value.comments,
      purchaseOrderStatusId: this.formOrdenCompra.value.purchaseOrderStatusId
    }
    this._ordenCompraService.updateOrdenCompra(this.idOrdenCompra, updateOrden)
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

  moveToGestionarOrdenCompra() {
    this._router.navigate(['/ventas/gestionarOrdenCompra/'])
  }

}
