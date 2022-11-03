import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SUPPLIER_URL} from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class SupplierService {

    constructor (private http: HttpClient ){ }

    //Listado general de los proveedores
    getProveedores(): Observable<any> {

        const url = `${SUPPLIER_URL}`
        return this.http.get(url)
    }

    //Registrar proveedores
    registrarProveedores(proveedor: any): Promise<any>{
        const url = `${SUPPLIER_URL}`
        return this.http.post<any>(url, proveedor).toPromise()
    }

    //Listar proveedores por ID
    getProveedoresxID(idProveedor: string): Observable<any>{

        const url = `${SUPPLIER_URL}/${idProveedor}`
        return this.http.get(url)
    }

    //Actualizar proveedores por ID
    actualizarProveedores(idProveedor: string, proveedor: any): Promise<any>{

        const url = `${SUPPLIER_URL}/${idProveedor}`
        return this.http.put<any>(url, proveedor).toPromise()
    }
}