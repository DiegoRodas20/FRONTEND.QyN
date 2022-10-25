import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import { VerUsuarioComponent } from './gestionar-usuario/components/ver-usuario/ver-usuario.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { UsuariosRoutingModule } from './usuarios.routing';


const COMPONENTS = [
    GestionarUsuarioComponent,
    VerUsuarioComponent,
    // AlertComponent,
    DropdownComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        UsuariosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        
        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class UsuariosModule { }