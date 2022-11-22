import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guard/login.guard';

const DEFAULT_ROUTE: string = 'dashboard'

const routes: Routes = [

    {
        path: '',
        redirectTo: DEFAULT_ROUTE,
        pathMatch: 'full'
    },

    // Admin Module
    {
        path: '',
        canActivate: [LoginGuard],
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
    },

    // Auth Module
    {
        path: 'login',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
    },

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }