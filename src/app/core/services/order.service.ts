import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ORDER_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";
import { UpdateOrder } from "../models/order.model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(private http: HttpClient) { }

    // Listado general de Clientes
    getPedidos(): Observable<ResponseData> {

        const url = `${ORDER_URL}`
        return this.http.get<ResponseData>(url)
    }

    // Listado general de Clientes
    getPedidosToAssign(): Observable<ResponseData> {

        const url = `${ORDER_URL}/toAssign`
        return this.http.get<ResponseData>(url)
    }
    // Listado general de estados
    getEstadosPedido(): Observable<ResponseData> {

        const url = `${ORDER_URL}/status`
        return this.http.get<ResponseData>(url)
    }

    // Listar Pedido por ID
    getPedidoxID(idPedido: string): Observable<ResponseData> {

        const url = `${ORDER_URL}/${idPedido}`
        return this.http.get<ResponseData>(url)
    }

    // Actualizar Pedido
    actualizarPedido(idPedido: string, pedido: UpdateOrder): Promise<ResponseData> {

        const url = `${ORDER_URL}/${idPedido}`

        return this.http.put<ResponseData>(url, pedido).toPromise()
    }


}
