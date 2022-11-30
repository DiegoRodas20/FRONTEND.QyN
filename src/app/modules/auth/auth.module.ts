import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { SignInComponent } from './signin/signin.component';

const COMPONENTS = [
    SignInComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        LucideAngularModule.pick(icons),

        SharedModule
    ]
})

export class AuthModule { }