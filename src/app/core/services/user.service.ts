import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { USER_URL } from "src/app/core/utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private _http: HttpClient) { }

    getUsuarios(): Observable<any> {
        return this._http.get(USER_URL)
    }
}