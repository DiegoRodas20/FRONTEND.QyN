import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from "../utils/url_constants";
import { SignIn } from "../models/auth.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) { }


    // Iniciar Sesion
    iniciarSesion(signin: SignIn): Promise<any> {

        const url = `${AUTH_URL}`
        return this.http.post<any>(url, signin, { observe: 'response' }).toPromise()
    }

}