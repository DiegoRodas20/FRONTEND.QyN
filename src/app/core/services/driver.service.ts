import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { DRIVER_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class DriverService {
    constructor( private http: HttpClient ) { }

    //listar Driver
    getDriver(): Observable<any>{
        const url = `${DRIVER_URL}`
        return this.http.get(url)
    }
}