import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
    private alertService: AlertService
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
              mensajeError += `• ${i}\n`
            }

            this.alertService.openModal({ typeModal: 'error', contenidoModal: mensajeError })
          }
          return throwError(error); // any further errors are returned to frontend                    
        })
      );
  }
}
