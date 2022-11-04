import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseData } from "../models/response.model";
import { ORDERVEHICLE_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class OrderVehicleService {

    constructor(private http: HttpClient) { }

    // Listado general de Clientes
    getPedidosPorVehiculoId(vehiculoId: number): Observable<ResponseData> {

        const url = `${ORDERVEHICLE_URL}/${vehiculoId}`
        return this.http.get<ResponseData>(url)
    }

    eliminarAsignacionPedido(id: number): Observable<ResponseData> {

        const url = `${ORDERVEHICLE_URL}/${id}`
        return this.http.delete<ResponseData>(url)
    }

    registrar(orderVehicle: any): Promise<any>{
        const url = `${ORDERVEHICLE_URL}`
        return this.http.post<any>(url, orderVehicle).toPromise()
    }

}