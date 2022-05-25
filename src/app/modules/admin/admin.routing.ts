import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [

            // Dashboard
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { titulo: 'Dashboard' }
            },

            // Usuarios module
            {
                path: 'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule)
            },

            // Almacen module
            {
                path: 'almacen',
                loadChildren: () => import('./almacen/almacen.module').then((m) => m.AlmacenModule)
            },

            // Ventas module
            {
                path: 'ventas',
                loadChildren: () => import('./ventas/ventas.module').then((m) => m.VentasModule)
            },

            // Fabricacion module
            {
                path: 'fabricacion',
                loadChildren: () => import('./fabricacion/fabricacion.module').then((m) => m.FabricacionModule)
            },

            // Transporte module
            {
                path: 'transporte',
                loadChildren: () => import('./transporte/transporte.module').then((m) => m.TransporteModule)
            }

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }