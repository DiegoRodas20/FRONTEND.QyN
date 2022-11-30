import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AddressMapComponent } from './components/address-map/address-map.component';
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
    ToastComponent,
    AddressMapComponent
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
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        LucideAngularModule.pick(icons)
    ]
})

export class SharedModule { }