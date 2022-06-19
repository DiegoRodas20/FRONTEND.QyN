import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientRoutingModule } from './client.routing';
import { HomeComponent } from './home/home.component';

const COMPONENTS = [
    HomeComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS,
        FormsModule,
        ReactiveFormsModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ClientRoutingModule,
        LucideAngularModule.pick(icons),
    ]
})

export class ClientModule { }