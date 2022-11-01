import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PURCHASE_ORDER_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class OrdenCompraService {

    constructor( private http: HttpClient ) { }

    //Listado general de las ordenes de compra
    getOrdenesCompra(): Observable<any> {

        const url = `${PURCHASE_ORDER_URL}`
        return this.http.get(url)
    }

    //Listar orden de compra por ID
    gestOrdenCompraxID(idOrdenCompra: string): Observable<any>{

        const url = `${PURCHASE_ORDER_URL}/${idOrdenCompra}`
        return this.http.get(url)
    }

    getEstadosOrdenCompra(): Observable<any>{
      const url = `${PURCHASE_ORDER_URL}/status`
      return this.http.get(url)
    }

}
