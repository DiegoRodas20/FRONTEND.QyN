import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    // Admin Module
    {
        path: '',
        loadChildren: () => import('./modules/admin/admin.module').then( (m) => m.AdminModule )
    },

    // Auth Module
    {
        path: 'login',
        loadChildren: () => import('./modules/auth/auth.module').then( (m) => m.AuthModule )
    },

    // Client Module
    {
        path: 'client',
        loadChildren: () => import('./modules/client/client.module').then( (m) => m.ClientModule )
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }