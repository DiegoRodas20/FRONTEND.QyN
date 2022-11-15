import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ActualizarContrasenaComponent } from './components/actualizar-contraseña/actualizar-contrasena.component';


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
        private _router: Router,
        private _dialog: MatDialog
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

    registrarUsuario(){
        this._router.navigate(['/usuarios/gestionarusuario/registrar'])
    }
    
    verUsuario(idUsuario: number) {
        this._router.navigate(['/usuarios/gestionarusuario/ver/' + idUsuario])
    }

    actualizarUsuario(idUsuario: number) {
        this._router.navigate(['/usuarios/gestionarusuario/actualizar/' + idUsuario])
    }

    actualizarContrasena(idUsuario: number) { 
    
        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']
        dialogConfig.data = idUsuario

        const dialogReg = this._dialog.open(ActualizarContrasenaComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getUsuarios())
    }

}