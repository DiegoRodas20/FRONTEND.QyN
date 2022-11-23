import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { RolesService } from 'src/app/core/services/roles.service';
import { UserService } from 'src/app/core/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Rol } from 'src/app/core/models/rol.model';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: 'asignar-roles.component.html'
})

export class AsignarRolesComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<AsignarRolesComponent>,
    private _rolesService: RolesService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) private _dialogData,
  ) { }

  roles: Rol[] = []
  rolesUsuario: Rol[] = []
  formRolesUsuario: FormGroup

  ngOnInit() {
    this.formRolesUsuario = this._formBuilder.group({
      rolIds: new FormArray([])
    })
    this.getRoles().then(() => {
      this.getRolesUsuario()
    })
  }

  createFormRoles() {
    this._formBuilder
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formRolesUsuario.get('rolIds') as FormArray;
    console.log(formArray.value)

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value))
    }
    else {
      let i: number = 0
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i)
          return
        }
        i++
      })
    }
  }


  async getRolesUsuario() {
    await this._userService.getRolesUsuario(this._dialogData).then((res) => {
      const formArray: FormArray = this.formRolesUsuario.get('rolIds') as FormArray;
      this.rolesUsuario = res.data
      this.rolesUsuario.map(({ id }) => {
        formArray.push(new FormControl(id))
      })
    })
  }

  isRol(idRol: number) {
    return this.rolesUsuario.some(({ id }) => idRol == id)
  }

  updateRolesUsuario() {
    let bodyUpdateRoles = {
      rolIds: this.formRolesUsuario.controls.rolIds.value,
      userId: this._dialogData
    }
    this._userService.actualizarRolesUsuario(this._dialogData, bodyUpdateRoles).then(() => {
      this._alertService.openModal({ typeModal: 'success', contenidoModal: 'Roles actualizados' })
      this.salir()
    }).catch((error)=>{
      let errorMensaje = error.error.error[0]
      this._alertService.openModal({ typeModal: 'error', contenidoModal: errorMensaje })
      this.salir()
    })
  }

  async getRoles() {
    await this._rolesService.getRoles().subscribe((res) => {
      this.roles = res.data
    })
  }

  salir() {
    this._dialogRef.close()
  }
}
