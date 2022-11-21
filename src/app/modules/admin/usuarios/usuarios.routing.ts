import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerUsuarioComponent } from './gestionar-usuario/components/ver-usuario/ver-usuario.component';
import { RegistrarUsuarioComponent } from './gestionar-usuario/components/registrar-usuario/registrar-usuario.component';
import { ActualizarUsuarioComponent } from './gestionar-usuario/components/actualizar-usuario/actualizar-usuario.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';


const routes: Routes = [

    {
        path: 'gestionarusuario', children: [
            { path: '', component: GestionarUsuarioComponent, data: { titulo: 'Gestionar Usuario' } },
            { path: 'registrar', component: RegistrarUsuarioComponent, data: { titulo: 'Registrar Usuario' } },
            { path: 'ver/:id', component: VerUsuarioComponent, data: { titulo: 'Ver Usuario' } },
            { path: 'actualizar/:id' , component: ActualizarUsuarioComponent, data: { titulo: 'Actualizar Usuario' } },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsuariosRoutingModule { }