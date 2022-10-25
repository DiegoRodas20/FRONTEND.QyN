import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CATEGORIAS_URL, PRODUCT_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class ProductoService {

    constructor(private http: HttpClient) { }

    // Listado general de Productos
    geProductos(): Observable<any> {

        const url = `${PRODUCT_URL}`
        return this.http.get(url)
    }

    // Listar Producto por ID
    getProductoxID(idProducto: string): Observable<any> {

        const url = `${PRODUCT_URL}/${idProducto}`
        return this.http.get(url)
    }

    getCategorias(): Observable<any> {

        const url = `${CATEGORIAS_URL}`
        return this.http.get(url)
    }
    postProducto(producto: any): Observable<any> {
        const url = `${PRODUCT_URL}`
        return this.http.post(url, producto)
    }

    putProducto(idProducto: string, producto: any): Observable<any> {
        const url = `${PRODUCT_URL}/${idProducto}`
        return this.http.put(url, producto)
    }


}