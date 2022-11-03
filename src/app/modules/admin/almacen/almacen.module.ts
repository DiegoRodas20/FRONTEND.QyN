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

const COMPONENTS = [
    GestionarAlmacenComponent,
    GestionarProductoComponent,
    GestionarMovimientoComponent,
    VerProductoComponent,
    DropdownComponent,
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
        PipeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,

        LucideAngularModule.pick(icons)
    ],
    exports: [
    ],
})

export class AlmacenModule { }