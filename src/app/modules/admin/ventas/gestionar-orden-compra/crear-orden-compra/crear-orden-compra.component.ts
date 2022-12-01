import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductoService } from 'src/app/core/services/product.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { OrdenCompraService } from 'src/app/core/services/ordenCompra.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-crear-orden-compra',
  templateUrl: 'crear-orden-compra.component.html'
})

export class CrearOrdenCompraComponent implements OnInit {

  formOrdenCompra: FormGroup
  urlImage: string
  lCategorias: Category[] = []
  itemActually: string = ''
  lSuppliers: Supplier[] = []
  lProducts: Product[] = []

  producto: Product = null
  precio: number
  cantidad: number

  constructor(
    private _productoService: ProductoService,
    private _supplierService: SupplierService,
    private _ordenCompraService: OrdenCompraService,
    private _dialogRef: MatDialogRef<CrearOrdenCompraComponent>,
    private _formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) private _dialogData,
    private _alertService: AlertService
  ) { }

  get purchaseOrderDetails() {
    return this.formOrdenCompra.controls["purchaseOrderDetails"] as FormArray
  }

  purchaseOrderDetailsForm = this._formBuilder.group({
    productId: [null, []],
    purchasePrice: [null, []],
    quantity: [null, []],
  })

  ngOnInit() {
    this.crearFormProducto()
    this.getSupplierList()
    this.getProductList()
  }


  getSupplierList() {
    this._supplierService.getSuppliers().subscribe((res) => {
      this.lSuppliers = res.data
    })
  }

  getProductList() {
    this._productoService.getProductos().subscribe((res) => {
      this.lProducts = res.data
    })
  }

  crearFormProducto() {
    this.formOrdenCompra = this._formBuilder.group({
      supplierId: [1, Validators.required],
      arrivalDate: [null, Validators.required],
      comments: ['', []],
      purchaseOrderDetails: this._formBuilder.array([]),
    })
  }

  addProductPurchaseOrder() {

    let productData = this._formBuilder.group({
      productId: [this.producto, []],
      purchasePrice: [this.precio, []],
      quantity: [this.cantidad, []],
    })

    let indexProduct: number = this.purchaseOrderDetails.value.findIndex(({ productId }) => productId == productData.value.productId)
    console.log(productData)

    if (indexProduct == -1) {
      this.purchaseOrderDetails.push(productData)
      console.log(this.purchaseOrderDetails)
      console.log(this.lProducts)
    }

    else {
      (<FormArray>this.formOrdenCompra.controls['purchaseOrderDetails']).at(indexProduct).patchValue(productData.value);
    }

    this.producto = null
    this.precio = null
    this.cantidad = null
  }

  async deleteProductPurchaseOrder(ProductId) {
    let indexProduct: number = await this.purchaseOrderDetails.value.findIndex(({ productId }) => productId == ProductId)
    const control = <FormArray>this.formOrdenCompra.controls['purchaseOrderDetails'];

    if (indexProduct != -1) {
      control.removeAt(indexProduct)
    }
  }

  getNameProduct(idProduct: number) {
    let productData: Product
    productData = this.lProducts.find(({ id }) => id == idProduct)
    return productData
  }

  isInvalidForm() {
    return this.formOrdenCompra.invalid || this.formOrdenCompra.value.purchaseOrderDetails.length == 0
  }

  registerPurchaseOrder() {
    this.formOrdenCompra.patchValue({ supplierId: + this.formOrdenCompra.value.supplierId })
    this._ordenCompraService.postOrdenCompra(this.formOrdenCompra.value).subscribe((res) => {
      this.salir()
      this._alertService.openModal({ typeModal: 'success', contenidoModal: res.message })
    })
  }

  salir() {
    this._dialogRef.close()
  }
}
