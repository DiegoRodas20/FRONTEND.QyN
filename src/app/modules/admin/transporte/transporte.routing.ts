import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarTransporteComponent } from './asignar-transporte/asignar-transporte.component';
import { VerPedidosTransporteComponent } from './asignar-transporte/components/ver-pedidos-transporte/ver-pedidos-transporte.component';
import { ActualizarVehiculoComponent } from './gestionar-vehiculos/components/actualizar-vehiculo/actualizar-vehiculo.component';
import { RegistrarVehiculoComponent } from './gestionar-vehiculos/components/registrar-vehiculo/registrar-vehiculo.component';
import { VerVehiculoComponent } from './gestionar-vehiculos/components/ver-vehiculo/ver-vehiculo.component';
import { GestionarVehiculosComponent } from './gestionar-vehiculos/gestionar-vehiculos.component';

const routes: Routes = [

    {
        path: 'asignartransporte', component: AsignarTransporteComponent, data: { titulo: 'Asignar Transporte' }
    },
    {
        path: 'asignartransporte', children: [
            { path: ':id', component: VerPedidosTransporteComponent, data: { titulo: 'Pedidos del transporte' } },
        ]
    },
    { path: 'gestionarvehiculos', component: GestionarVehiculosComponent, data: { titulo: 'Gestionar Vehiculos' } },
    {
        path: 'gestionarvehiculos', children: [
            { path: 'registrar', component: RegistrarVehiculoComponent, data: { titulo: 'Registrar Vehiculo' } },
            { path: 'ver/:id', component: VerVehiculoComponent, data: { titulo: 'Ver Vehiculo' } },
            { path: 'actualizar/:id', component: ActualizarVehiculoComponent, data: { titulo: 'Actualizar Vehiculo' } },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TransporteRoutingModule { }