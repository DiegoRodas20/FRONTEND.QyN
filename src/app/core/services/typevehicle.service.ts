import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TYPEVEHICLE_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class TypeVehicleService {
    constructor( private http: HttpClient ) { }

    //listar Driver
    getTypeVehicle(): Observable<any>{
        const url = `${TYPEVEHICLE_URL}`
        return this.http.get(url)
    }
}