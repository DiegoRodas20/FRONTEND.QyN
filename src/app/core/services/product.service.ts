import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PRODUCT_URL } from "../utils/url_constants";

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


}