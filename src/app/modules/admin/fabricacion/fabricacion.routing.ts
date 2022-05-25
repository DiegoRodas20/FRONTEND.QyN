import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarFabricacionComponent } from './gestionar-fabricacion/gestionar-fabricacion.component';
import { GestionarFormulacionComponent } from './gestionar-formulacion/gestionar-formulacion.component';

const routes: Routes = [

    { path: 'gestionarfabricacion', component: GestionarFabricacionComponent, data: { titulo: 'Gestionar Fabricación' }  },
    { path: 'gestionarformulacion', component: GestionarFormulacionComponent, data: { titulo: 'Gestionar Formulación' }  }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FabricacionRoutingModule { }