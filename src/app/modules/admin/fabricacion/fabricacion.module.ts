import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';

import { FabricacionRoutingModule } from './fabricacion.routing';
import { GestionarFabricacionComponent } from './gestionar-fabricacion/gestionar-fabricacion.component';
import { GestionarFormulacionComponent } from './gestionar-formulacion/gestionar-formulacion.component';

const COMPONENTS = [
    GestionarFabricacionComponent,
    GestionarFormulacionComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FabricacionRoutingModule,

        LucideAngularModule.pick(icons)
    ],
    exports: []
})

export class FabricacionModule { }