import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { AlmacenModule } from './almacen/almacen.module';
import { FabricacionModule } from './fabricacion/fabricacion.module';
import { ShellComponent } from './shell/shell.component';
import { TransporteModule } from './transporte/transporte.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';

const COMPONENTS = [
    ShellComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS,
        FormsModule,
        ReactiveFormsModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        AdminRoutingModule,
        LucideAngularModule.pick(icons),

        // Modulos
        UsuariosModule,
        AlmacenModule,
        VentasModule,
        FabricacionModule,
        TransporteModule
    ]
})

export class AdminModule { }