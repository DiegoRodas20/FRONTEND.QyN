export interface PurchaseOrderStatus {
  id: number,
  name: string
}

export interface PurchaseOrder {
  id: number,
  supplierName: string,
  arrivalDate: string,
  comments: string,
  purchaseOrderStatusId: number,
  purchaseOrderStatus: string
}

export interface PurchaseOrderDetail {
  productId: number,
  purchasePrice:number,
  quantity: number
}

export interface UpdatePurchaseOrder {
  id: number,
  arrivalDate: Date,
  comments: string,
  purchaseOrderStatusId: number
}
