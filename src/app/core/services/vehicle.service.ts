import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { VEHICLE_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class VehiculoService {

    constructor( private http: HttpClient ) { }

    //Listado general de los vehiculos
    getVehiculos(): Observable<any> {

        const url = `${VEHICLE_URL}`
        return this.http.get(url)
    }

    //Registrar Vehiculo
    registrarVehiculo(vehiculo: any): Promise<any>{
        const url = `${VEHICLE_URL}`
        return this.http.post<any>(url, vehiculo).toPromise()
    }

    //Listar Vehiculo por ID
    gestVehiculoxID(idVehiculo: string): Observable<any>{

        const url = `${VEHICLE_URL}/${idVehiculo}`
        return this.http.get(url)
    }

    //Actualizar Vehiculo por ID
    actualizarVehiculo(idVehiculo: string, vehiculo: any): Promise<any>{

        const url = `${VEHICLE_URL}/${idVehiculo}`
        return this.http.put<any>(url, vehiculo).toPromise()
    }
}

