import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { USER_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }

    // Listado general de Usuarios
    getUsuarios(): Observable<any> {

        const url = `${USER_URL}`
        return this.http.get(url)
    }

    // Listar Usuario por ID
    getUsuarioxID(idUsuario: string): Observable<any> {

        const url = `${USER_URL}/${idUsuario}`
        return this.http.get(url)
    }


}