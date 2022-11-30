import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { VerUsuarioComponent } from './gestionar-usuario/components/ver-usuario/ver-usuario.component';
import { RegistrarUsuarioComponent } from './gestionar-usuario/components/registrar-usuario/registrar-usuario.component';
import { ActualizarUsuarioComponent } from './gestionar-usuario/components/actualizar-usuario/actualizar-usuario.component';
import { ActualizarContrasenaComponent } from './gestionar-usuario/components/actualizar-contraseña/actualizar-contrasena.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { UsuariosRoutingModule } from './usuarios.routing';
import { AsignarRolesComponent } from './gestionar-usuario/components/asignar-roles/asignar-roles.component';
import { SharedModule } from 'src/app/shared/shared.module';


const COMPONENTS = [
    GestionarUsuarioComponent,
    VerUsuarioComponent,
    RegistrarUsuarioComponent,
    ActualizarUsuarioComponent,
    ActualizarContrasenaComponent,
    AsignarRolesComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        UsuariosRoutingModule,
        NgxPaginationModule,
        PipeModule,
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule.pick(icons),
        SharedModule
    ],
    exports: [],
})

export class UsuariosModule { }
