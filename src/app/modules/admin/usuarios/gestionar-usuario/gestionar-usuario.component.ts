import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AlertDialogComponent } from 'src/app/shared/components/alertdialog/alertdialog.component';


@Component({
    selector: 'app-gestionar-usuario',
    templateUrl: 'gestionar-usuario.component.html'
})

export class GestionarUsuarioComponent implements OnInit {

    lUsuarios: any[] = []
    Mensaje: string
    pruebatitulo = "prueba titulo"
    pruebacontenido = "prueba contenido"
    pruebaestilo = ""

    constructor(
        private _usuarioService: UserService,
        private _router: Router,
        // private _dialog: MatDialog
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

    verUsuario(idUsuario: string) {
        this._router.navigate(['/usuarios/gestionarusuario/ver/' + idUsuario])
    }

    pruebaDialog() {
        this.pruebaestilo = "overflow-y-auto show modal-show"
    }

    cambiarestilo(event) {
        this.pruebaestilo = event
    }
}