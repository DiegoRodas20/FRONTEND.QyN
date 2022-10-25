import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { VerProductoComponent } from './gestionar-producto/ver-producto/ver-producto.component';

const COMPONENTS = [
    GestionarAlmacenComponent,
    GestionarProductoComponent,
    GestionarMovimientoComponent,
    VerProductoComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlmacenRoutingModule,
        PipeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        LucideAngularModule.pick(icons)
    ],
    exports: [
    ],
})

export class AlmacenModule { }