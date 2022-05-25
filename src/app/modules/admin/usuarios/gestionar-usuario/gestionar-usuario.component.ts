import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';


@Component({
    selector: 'app-gestionar-usuario',
    templateUrl: 'gestionar-usuario.component.html'
})

export class GestionarUsuarioComponent implements OnInit {

    lUsuarios: any[] = []
    Mensaje: string

    constructor(
        private _usuarioService: UserService
    ) { }

    ngOnInit() {
        this.getUsuarios()
    }

    async getUsuarios() {

        try {

            const data: any = await this._usuarioService.getUsuarios().toPromise()
            console.log(data)

            this.Mensaje = data.message
            this.lUsuarios = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }
}