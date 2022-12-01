import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { DASHBOARD_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    constructor(private http: HttpClient) { }

    getDataDashboard(): Observable<any> {
        const url = `${DASHBOARD_URL}`
        return this.http.get(url)
    }
}