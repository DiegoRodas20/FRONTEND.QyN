import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const COMPONENTS = [
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        LucideAngularModule.pick(icons)
    ]
})

export class SharedModule { }