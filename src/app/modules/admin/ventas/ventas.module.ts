import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { FilterTablePipe } from 'src/app/core/pipes/filterTable.pipe';
import { PipeModule } from 'src/app/core/pipes/pipe.module';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ActualizarClienteComponent } from './gestionar-cliente/components/actualizar-cliente/actualizar-cliente.component';
import { VerClienteComponent } from './gestionar-cliente/components/ver-cliente/ver-cliente.component';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { ActualizarPedidoComponent } from './gestionar-pedido/components/actualizar-pedido/actualizar-pedido.component';
import { GestionarOrdenCompraComponent } from './gestionar-orden-compra/gestionar-orden-compra.component';
import { VerOrdenCompraComponent } from './gestionar-orden-compra/ver-orden-compra/ver-orden-compra.component';
import { VerPedidoComponent } from './gestionar-pedido/components/ver-pedido/ver-pedido.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { VentasRoutingModule } from './ventas.routing';
import { CrearOrdenCompraComponent } from './gestionar-orden-compra/crear-orden-compra/crear-orden-compra.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ActualizarOrdenCompraComponent } from './gestionar-orden-compra/actualizar-orden-compra/actualizar-orden-compra.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { VisualizarReportesComponent } from './visualizar-reportes/visualizar-reportes.component';
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [
    GestionarVentaComponent,
    GestionarClienteComponent,
    GestionarPedidoComponent,
    GestionarOrdenCompraComponent,
    VerOrdenCompraComponent,
    VerPedidoComponent,
    ActualizarPedidoComponent,
    CrearOrdenCompraComponent,
    ActualizarOrdenCompraComponent,
    VerClienteComponent,
    ActualizarClienteComponent,
]

@NgModule({
    providers: [DatePipe, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
    declarations: [
        COMPONENTS,
        VisualizarReportesComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        RouterModule,
        VentasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        LucideAngularModule.pick(icons),
        SharedModule,


        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
    ],
    exports: [
    ],
})

export class VentasModule { }
