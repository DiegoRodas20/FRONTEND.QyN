import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CLIENT_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class ClienteService {

    constructor(private http: HttpClient) { }

    // Listado general de Clientes
    getClientes(): Observable<any> {

        const url = `${CLIENT_URL}`
        return this.http.get(url)
    }

    // Listar Cliente por ID
    getClientxID(idCliente: string): Observable<any> {

        const url = `${CLIENT_URL}/${idCliente}`
        return this.http.get(url)
    }

    // Actualizar Cliente
    actualizarCliente(idCliente: string, cliente: any): Promise<any> {

        const url = `${CLIENT_URL}/${idCliente}`

        return this.http.put<any>(url, cliente).toPromise()
    }


}
