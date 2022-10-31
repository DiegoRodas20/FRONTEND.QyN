import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';
import { RegistrarProveedorComponent } from './gestionar-proveedor/components/registrar-proveedor/registrar-proveedor.component';
import { ActualizarProveedorComponent } from './gestionar-proveedor/components/actualizar-proveedor/actualizar-proveedor.component';
import { VerProveedorComponent } from './gestionar-proveedor/components/ver-proveedor/ver-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    GestionarAlmacenComponent,
    GestionarProductoComponent,
    GestionarMovimientoComponent,
    GestionarProveedorComponent,
    RegistrarProveedorComponent,
    ActualizarProveedorComponent,
    VerProveedorComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlmacenRoutingModule,
        FormsModule,
        ReactiveFormsModule,

        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class AlmacenModule { }