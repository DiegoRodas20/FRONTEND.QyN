import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { VentasRoutingModule } from './ventas.routing';

const COMPONENTS = [
    GestionarVentaComponent,
    GestionarClienteComponent,
    GestionarPedidoComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        VentasRoutingModule,

        LucideAngularModule.pick(icons)
    ],
    exports: [],
})

export class VentasModule { }