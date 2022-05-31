import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
    selector: 'app-ver-usuario',
    templateUrl: 'ver-usuario.component.html'
})

export class VerUsuarioComponent implements OnInit {

    idUsuario: string
    formUsuario: FormGroup

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _usuarioService: UserService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.crearFormUsuario()

        this._route.params.subscribe(params => {
            this.idUsuario = params.id
            this.listarUsuarioxID(this.idUsuario)
        })
    }

    crearFormUsuario() {
        this.formUsuario = this._formBuilder.group({
            firstName: [null, []],
            lastName: [null, []],
            email: [null, []],
            estado: [null, []]
        })
    }

    async listarUsuarioxID(idTramite: string) {
        try {
            const data: any = await this._usuarioService.getUsuarioxID(idTramite).toPromise()
            this.formUsuario.patchValue(data.data)
            this.formUsuario.controls['estado'].setValue(data.data.isActive ? 'Activo' : 'Inactivo')
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    cerrarVentana() {
        this._router.navigate(['/usuarios/gestionarusuario'])
    }
}