import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {  PEDIDO_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class PedidoService {

    constructor( private http: HttpClient ) { }

    // Listado general de Clientes
    getPedidos(): Observable<any> {

        const url = `${PEDIDO_URL}`
        return this.http.get(url)
    }

}
