import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { USER_URL } from "src/app/core/utils/url_constants";
import { updatePassword } from "../models/user.model";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private _http: HttpClient) { }

    //lista general usuario
    getUsuarios(): Observable<any> {
        return this._http.get(USER_URL)
    }

    //lista usuario por id
    getUsuarioxID(idUsuario: number): Observable<any> {
        const url = `${USER_URL}/${idUsuario}`
        return this._http.get(url)
    }

    //Registrar Usuario
    registrarUsuario(usuario: any): Promise<any> {
        const url = `${USER_URL}`
        return this._http.post<any>(url, usuario).toPromise()
    }

    //Actualizar Usuario
    actualizarUsuario(idUsuario: number, usuario: any): Promise<any> {
        const url = `${USER_URL}/${idUsuario}`
        return this._http.put<any>(url, usuario).toPromise()
    }

    //ActualizarContraseña
    actualizarContrasena(idUsuario: number, actualizarUsuarioPassword: updatePassword): Promise<ResponseData>{
        const url = `${USER_URL}/${idUsuario}/password`
        return this._http.put<ResponseData>(url,actualizarUsuarioPassword).toPromise()
    }

    actualizarRolesUsuario(idUsuario:number, rolesUsuario: any){
      const url = `${USER_URL}/${idUsuario}/rols`
      return this._http.put<ResponseData>(url,rolesUsuario).toPromise()
    }

    getRolesUsuario(idUsuario:number){
      const url = `${USER_URL}/${idUsuario}/rols`
      return this._http.get<ResponseData>(url).toPromise()
    }
}
