import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { SignIn } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html'
})

export class SignInComponent implements OnInit {

    hidePassword: boolean = true
    formSignIn: FormGroup

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormSignIn()
    }

    crearFormSignIn() {
        this.formSignIn = this._formBuilder.group({
            userName: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        })
    }

    async iniciarSesion() {

        if (this.formSignIn.invalid) {
            this._alertService.openModal({ typeModal: 'alert', contenidoModal: 'Formato inválido, revise los campos porfavor.' })
            this.formSignIn.markAllAsTouched()
            return
        }

        let form = this.formSignIn.value

        let signin: SignIn = {
            userName: form.userName,
            password: form.password
        }

        const data: any = await this._authService.iniciarSesion(signin)
        const token = data.headers.get('authorization')
        const usuario = atob(data.headers.get('authorization').split('.')[1])

        localStorage.setItem('Usuario', usuario)
        localStorage.setItem('Token', token)
        this._alertService.openModal({ typeModal: 'success', contenidoModal: data.body.message })

        this._router.navigate(['/dashboard']).then(() => {
            window.location.reload();
        })


    }

}
