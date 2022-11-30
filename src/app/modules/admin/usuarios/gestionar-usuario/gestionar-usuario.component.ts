import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActualizarContrasenaComponent } from './components/actualizar-contraseña/actualizar-contrasena.component';
import { AsignarRolesComponent } from './components/asignar-roles/asignar-roles.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';

@Component({
    selector: 'app-gestionar-usuario',
    templateUrl: 'gestionar-usuario.component.html'
})

export class GestionarUsuarioComponent implements OnInit {

    lUsuarios: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _usuarioService: UserService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getUsuarios()
    }

    async getUsuarios() {
        try {
            const data: any = await this._usuarioService.getUsuarios().toPromise()
            this.Mensaje = data.message
            this.lUsuarios = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    registrarUsuario() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(RegistrarUsuarioComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(() => this.getUsuarios())
    }

    verUsuario(idUsuario: number) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.data = idUsuario
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(VerUsuarioComponent, dialogConfig)
    }

    actualizarUsuario(idUsuario: number) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.data = idUsuario
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(ActualizarUsuarioComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getUsuarios())
    }

    actualizarContrasena(idUsuario: number) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = idUsuario
        dialogConfig.width = '25rem'
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(ActualizarContrasenaComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getUsuarios())
    }

    openAsignarRolesDialog(idUsuario: number): void {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = idUsuario
        dialogConfig.width = '30rem'
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(AsignarRolesComponent, dialogConfig)
    }

}
