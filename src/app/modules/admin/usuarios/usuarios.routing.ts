import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerUsuarioComponent } from './gestionar-usuario/components/ver-usuario/ver-usuario.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';


const routes: Routes = [

    {
        path: 'gestionarusuario', children: [
            { path: '', component: GestionarUsuarioComponent, data: { titulo: 'Gestionar Usuario' } },
            { path: 'ver/:id', component: VerUsuarioComponent, data: { titulo: 'Ver Usuario' } }
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsuariosRoutingModule { }