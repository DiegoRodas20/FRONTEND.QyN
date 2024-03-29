import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { VerProductoComponent } from './gestionar-producto/ver-producto/ver-producto.component';
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';
import { RegistrarProveedorComponent } from './gestionar-proveedor/components/registrar-proveedor/registrar-proveedor.component';
import { ActualizarProveedorComponent } from './gestionar-proveedor/components/actualizar-proveedor/actualizar-proveedor.component';
import { VerProveedorComponent } from './gestionar-proveedor/components/ver-proveedor/ver-proveedor.component';
import { RegistrarProductoComponent } from './gestionar-producto/registrar-producto/registrar-producto.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ActualizarProductoComponent } from './gestionar-producto/actualizar-producto/actualizar-producto.component';
import { VisualizarMovimientosComponent } from './gestionar-producto/visualizar-movimientos/visualizar-movimientos.component';
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [
    GestionarAlmacenComponent,
    GestionarProductoComponent,
    GestionarMovimientoComponent,

    VerProductoComponent,
    RegistrarProductoComponent,
    ActualizarProductoComponent,
    DropdownComponent,

    GestionarProveedorComponent,
    RegistrarProveedorComponent,
    ActualizarProveedorComponent,
    VerProveedorComponent,

    // AlertComponent
]

@NgModule({
    declarations: [
        COMPONENTS,
        VisualizarMovimientosComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlmacenRoutingModule,
        PipeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule.pick(icons),
        SharedModule
    ],
    exports: [
    ],
})

export class AlmacenModule { }