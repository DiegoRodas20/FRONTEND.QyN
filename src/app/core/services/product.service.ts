import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PRODUCT_URL } from "../utils/url_constants";
import { Product } from "../models/product.model";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class ProductoService {

    constructor(private http: HttpClient) { }

    // Listado general de Productos
    getProductos(): Observable<ResponseData> {

        const url = `${PRODUCT_URL}/catalog`
        return this.http.get<ResponseData>(url)
    }

    // Listar Producto por ID
    getProductoxID(idProducto: string): Observable<ResponseData> {

        const url = `${PRODUCT_URL}/${idProducto}`
        return this.http.get<ResponseData>(url)
    }


}