import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';

const routes: Routes = [

    { path: 'gestionarventa', component: GestionarVentaComponent, data: { titulo: 'Gestionar Venta' } },
    { path: 'gestionarcliente', component: GestionarClienteComponent, data: { titulo: 'Gestionar Cliente' } },
    { path: 'gestionarpedido', component: GestionarPedidoComponent, data: { titulo: 'Gestionar Cliente' } }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VentasRoutingModule { }