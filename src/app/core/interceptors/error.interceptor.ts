import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Catching Error Stage
          if (error && error.error && error.error.error ) {
            console.log(error.error.error)
            // let mensajeprueba = "";

            // for (let i of error.error.error) {
            //     mensajeprueba += `• ${i}<br>`
            // }

            // Swal.fire({
            //     title: '¡Atención!',
            //     html: `<div>${mensajeprueba}</div>`,
            //     toast: true,
            //     position: 'top-end',
            //     icon: 'warning',
            //     showCloseButton: true,
            //     showConfirmButton: false,
            //     width: '25em'
            // })
          }
          return throwError(error); // any further errors are returned to frontend                    
        })
      );
  }
}
