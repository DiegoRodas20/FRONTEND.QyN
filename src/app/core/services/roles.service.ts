import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ROLES_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class RolesService {

    constructor(private http: HttpClient) { }

    // Listado general de Roes
    getRoles(): Observable<ResponseData> {
        return this.http.get<ResponseData>(ROLES_URL)
    }

}
