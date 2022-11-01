import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SUPPLIER_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class SupplierService {

    constructor( private http: HttpClient ) { }

    //Listado general de supplier
    getSuppliers(): Observable<any> {
        const url = `${SUPPLIER_URL}`
        return this.http.get(url)
    }

}
