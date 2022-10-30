import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';

const COMPONENTS = [
    GestionarAlmacenComponent,
    GestionarProductoComponent,
    GestionarMovimientoComponent,
    GestionarProveedorComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlmacenRoutingModule,

        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class AlmacenModule { }