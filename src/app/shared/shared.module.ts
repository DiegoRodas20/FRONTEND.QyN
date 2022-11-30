import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoaderComponent } from './components/loader/loader.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastComponent } from './components/toast/toast.component';
import { MaterialModule } from './material/material.module';

const COMPONENTS = [
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent,

    AlertComponent,
    LoaderComponent,
    ErrorMessageComponent,
    ToastComponent
]

@NgModule({
    declarations: [
        COMPONENTS,
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        LucideAngularModule.pick(icons)
    ]
})

export class SharedModule { }