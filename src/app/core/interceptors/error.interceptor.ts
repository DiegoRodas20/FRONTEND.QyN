import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private _toastService: ToastService
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Catching Error Stage
          if (error && error.error && error.error.error) {
            let mensajeError = "";

            for (let i of error.error.error) {
              mensajeError += `${i}\n`
            }

            let contenido: Alert = {
              type: 'error',
              contenido: mensajeError
            }

            this._toastService.open(contenido)
            // this.alertService.openModal({ typeModal: 'error', contenidoModal: mensajeError })
          }
          return throwError(error); // any further errors are returned to frontend                    
        })
      );
  }
}
