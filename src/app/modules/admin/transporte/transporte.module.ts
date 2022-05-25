import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

import { AsignarTransporteComponent } from './asignar-transporte/asignar-transporte.component';
import { GestionarVehiculosComponent } from './gestionar-vehiculos/gestionar-vehiculos.component';
import { TransporteRoutingModule } from './transporte.routing';

const COMPONENTS = [
    AsignarTransporteComponent,
    GestionarVehiculosComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        TransporteRoutingModule,

        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class TransporteModule { }