export interface Product {
    id: number,
    code: string,
    name: string,
    type: string,
    quantity: number,
    salesPrice: number,
    urlImage: string,
    showInCatalog: boolean
}

export interface RegisterProduct extends Product {
    code: string,
    salesPrice: number,
    purchasePrice: number,
    categoryId: number,
    minStock: number,
    maxStock: number,
    stock: number,
    urlImage: string
}

export interface UpdateProduct extends Product {
    code: string,
    salesPrice: number,
    purchasePrice: number,
    categoryId: number,
    minStock: number,
    maxStock: number,
    stock: number,
    urlImage: string
}

export interface CategoryProduct {
    id: number,
    name: string
}