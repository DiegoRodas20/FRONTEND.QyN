import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarTransporteComponent } from './asignar-transporte/asignar-transporte.component';
import { GestionarVehiculosComponent } from './gestionar-vehiculos/gestionar-vehiculos.component';

const routes: Routes = [

    { path: 'asignartransporte', component: AsignarTransporteComponent, data: { titulo: 'Asignar Transporte' } },
    { path: 'gestionarvehiculos', component: GestionarVehiculosComponent, data: { titulo: 'Gestionar Vehiculos' } }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TransporteRoutingModule { }