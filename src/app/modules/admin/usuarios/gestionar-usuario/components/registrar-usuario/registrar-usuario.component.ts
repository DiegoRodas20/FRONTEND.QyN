import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({

    selector: 'app-registrar-usuario',
    templateUrl: 'registrar-usuario.component.html'
})

export class RegistrarUsuarioComponent implements OnInit {

    formUsuario: FormGroup
    modalClass: string = ''

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _usuarioService: UserService
    ) { }

    ngOnInit() {
        this.crearFormUsuario()
        this.registrarUsuario()
    }

    crearFormUsuario() {
        this.formUsuario = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
            password: [null, [Validators.required, Validators.maxLength(30)]],
            firstName: [null, [Validators.required, Validators.maxLength(30)]],
            lastName: [null, [Validators.required, Validators.maxLength(30)]],
            surName: [null, [Validators.required, Validators.maxLength(30)]],
            bornDate: [null, [Validators.required]],
        })
    }

    async registrarUsuario() {
        if(this.formUsuario.invalid) {
            return
        }
        let form = this.formUsuario.value
        let Usuario: any = {
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            surName: form.surName,
            bornDate: form.bornDate,
        }
        try {
            let data = await this._usuarioService.registrarUsuario(Usuario)
            this.modalClass = ' overflow-y-auto show'
        }
        catch(error){
            console.log(error)
        }
    }

    modificarCSSModal() {
        this.modalClass = ''
    }

    cerrarVentana() {
        this._router.navigate(['/usuarios/gestionarusuario'])
    }
}