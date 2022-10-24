import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterTablePipe } from 'src/app/core/pipes/filterTable.pipe';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { ActualizarPedidoComponent } from './gestionar-pedido/components/actualizar-pedido/actualizar-pedido.component';
import { VerPedidoComponent } from './gestionar-pedido/components/ver-pedido/ver-pedido.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { VentasRoutingModule } from './ventas.routing';
import { VerClienteComponent } from './gestionar-cliente/components/ver-cliente/ver-cliente.component';
import { ActualizarClienteComponent } from './gestionar-cliente/components/actualizar-cliente/actualizar-cliente.component';

const COMPONENTS = [
    GestionarVentaComponent,
    GestionarClienteComponent,
    GestionarPedidoComponent,
    VerPedidoComponent,
    ActualizarPedidoComponent,
    ActualizarClienteComponent,
    VerClienteComponent,
]

const PIPES = [
    FilterTablePipe
]

@NgModule({
    declarations: [
        COMPONENTS,
        PIPES,
        VerClienteComponent,
        ActualizarClienteComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        VentasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        LucideAngularModule.pick(icons)
    ],
    exports: [
        PIPES
    ],
})

export class VentasModule { }