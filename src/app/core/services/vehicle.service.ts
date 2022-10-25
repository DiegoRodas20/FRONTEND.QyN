import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CLIENT_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class VehicleService {

    constructor(private http: HttpClient) { }

    // Listado general de Clientes
    getVehicles(): Observable<any> {

        const url = `${CLIENT_URL}`
        return this.http.get(url)
    }

    // Listar Cliente por ID
    getVehiclexID(idCliente: string): Observable<any> {

        const url = `${CLIENT_URL}/${idCliente}`
        return this.http.get(url)
    }


}
