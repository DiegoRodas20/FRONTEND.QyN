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

    // Listado general de estados
    getEstadosPedido(): Observable<any> {

        const url = `${PEDIDO_URL}/states`
        return this.http.get(url)
    }

    // Listar Pedido por ID
    getPedidoxID(idPedido: string): Observable<any> {

        const url = `${PEDIDO_URL}/${idPedido}`
        return this.http.get(url)
    }

    // Actualizar Pedido
    actualizarPedido(idPedido: string, pedido: any): Promise<any> {

        const url = `${PEDIDO_URL}/${idPedido}`

        return this.http.put<any>(url, pedido).toPromise()
    }


}
