import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';


@Component({
    selector: 'app-gestionar-usuario',
    templateUrl: 'gestionar-usuario.component.html'
})

export class GestionarUsuarioComponent implements OnInit {

    lUsuarios: any[] = []
    Mensaje: string

    typeModal: string
    openModal: boolean = false

    constructor(
        private _router: Router
    ) { }

    ngOnInit() { }

    verUsuario(idUsuario: string) {
        this._router.navigate(['/usuarios/gestionarusuario/ver/' + idUsuario])
    }

    onOpenModal() {
        this.openModal = true
        this.typeModal = 'success'
    }

    onCloseModal(event: boolean) {
        this.openModal = event
    }
}