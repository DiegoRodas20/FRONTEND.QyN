import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignarTransporteComponent } from './asignar-transporte/asignar-transporte.component';
import { GestionarVehiculosComponent } from './gestionar-vehiculos/gestionar-vehiculos.component';
import { TransporteRoutingModule } from './transporte.routing';
import { RegistrarVehiculoComponent } from './gestionar-vehiculos/components/registrar-vehiculo/registrar-vehiculo.component';
import { VerVehiculoComponent } from './gestionar-vehiculos/components/ver-vehiculo/ver-vehiculo.component';
import { ActualizarVehiculoComponent } from './gestionar-vehiculos/components/actualizar-vehiculo/actualizar-vehiculo.component';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { VerPedidosTransporteComponent } from './asignar-transporte/components/ver-pedidos-transporte/ver-pedidos-transporte.component';
import { RegistrarPedidosTransporteComponent } from './asignar-transporte/components/registrar-pedidos-transporte/registrar-pedidos-transporte.component';

const COMPONENTS = [
    AsignarTransporteComponent,
    GestionarVehiculosComponent,
    RegistrarVehiculoComponent,
    VerVehiculoComponent,
    ActualizarVehiculoComponent,
]

@NgModule({
    declarations: [
        COMPONENTS,
        VerPedidosTransporteComponent,
        RegistrarPedidosTransporteComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        RouterModule,
        TransporteRoutingModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class TransporteModule { }