import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
    selector: 'app-ver-usuario',
    templateUrl: 'ver-usuario.component.html'
})

export class VerUsuarioComponent implements OnInit {

    idUsuario: number
    formUsuario: FormGroup

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _usuarioService: UserService
    ) { }

    ngOnInit() {
        this.crearFormUsuario()

        this._route.params.subscribe(params => {
            this.idUsuario = params.id
            this.listarUsuarioxID(this.idUsuario)
        })
    }
    setVacio(dato: string){
        return dato == '' ? '-' : dato
    }
    setEstado(estado: boolean){
        return estado ? 'Activo' : 'Inactivo'
    }

    // formatDate(){
    //     const date = new Date(this.formUsuario.value.bornDate)
    //     return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    // }

    crearFormUsuario() {
        this.formUsuario = this._formBuilder.group({
            email: [null, []],
            isActive: [null, []],
            firstName: [null, []],
            lastName: [null, []],
            surName: [null, []],
            bornDate: [null, []],
        })
    }

    async listarUsuarioxID(idUsuario: number) {
        try {
            const data: any = await this._usuarioService.getUsuarioxID(idUsuario).toPromise()
            this.formUsuario.patchValue({...data.data, isActive: this.setEstado(data.data.isActive), firstName: this.setVacio(data.data.firstName), lastName: this.setVacio(data.data.lastName), surName: this.setVacio(data.data.surName)})
            console.log(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    cerrarVentana() {
        this._router.navigate(['/usuarios/gestionarusuario'])
    }
}