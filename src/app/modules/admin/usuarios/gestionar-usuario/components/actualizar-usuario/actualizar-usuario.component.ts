import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
    providers: [DatePipe],
    selector: 'app-actualizar-usuario',
    templateUrl: 'actualizar-usuario.component.html'
})

export class ActualizarUsuarioComponent implements OnInit {

    idUsuario: number
    lEstados: any [] = [{status: true, name: 'Activo'},{status: false, name: 'Inactivo'}]
    formUsuario: FormGroup
    modalClass: string = ''

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _usuarioService: UserService,
        private _datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.crearFormUsuario()
        this._route.params.subscribe(params => {
            this.idUsuario = params.id
            this.listarUsuarioxID(this.idUsuario)
        })
    }

    crearFormUsuario(){
        this.formUsuario = this._formBuilder.group({
            firstName: [null, []],
            lastName: [null, []],
            surName: [null, []],
            bornDate: [null, []],
            isActive: [null, []],
        })
    }

    async listarUsuarioxID(idUsuario: number) {
        try {
            const data: any = await this._usuarioService.getUsuarioxID(idUsuario).toPromise()
            this.formUsuario.patchValue(data.data)
            let date = new Date(data.data['bornDate'])
            date.setDate(date.getDate() + 1);
            this.formUsuario.controls['bornDate'].setValue(this._datePipe.transform(date, 'yyyy-MM-dd'))
            console.log(data.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }
    
    async actualizarUsuario(){
        if(this.formUsuario.invalid){
            return
        }
        let form = this.formUsuario.value
        let Usuario: any = {
            firstName: form.firstName,
            lastName: form.lastName,
            surName: form.surName,
            bornDate: form.bornDate,
            isActive: (form.isActive == "true")
        }

        try{
            let data = await this._usuarioService.actualizarUsuario(this.idUsuario, Usuario)
            this.listarUsuarioxID(this.idUsuario)
            this.modalClass = ' overflow-y-auto show'
        }
        catch (error) {
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