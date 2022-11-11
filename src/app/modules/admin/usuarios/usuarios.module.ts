import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { VerUsuarioComponent } from './gestionar-usuario/components/ver-usuario/ver-usuario.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { UsuariosRoutingModule } from './usuarios.routing';


const COMPONENTS = [
    GestionarUsuarioComponent,
    VerUsuarioComponent
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
        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class UsuariosModule { }