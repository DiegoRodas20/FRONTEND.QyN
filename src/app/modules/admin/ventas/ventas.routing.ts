import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarOrdenCompraComponent } from './gestionar-orden-compra/gestionar-orden-compra.component';
import { ActualizarPedidoComponent } from './gestionar-pedido/components/actualizar-pedido/actualizar-pedido.component';
import { VerPedidoComponent } from './gestionar-pedido/components/ver-pedido/ver-pedido.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';

const routes: Routes = [

    { path: 'gestionarventa', component: GestionarVentaComponent, data: { titulo: 'Gestionar Venta' } },
    { path: 'gestionarcliente', component: GestionarClienteComponent, data: { titulo: 'Gestionar Cliente' } },
    {
        path: 'gestionarpedido', children: [
            { path: '', component: GestionarPedidoComponent, data: { titulo: 'Gestionar Pedido' } },
            { path: 'ver/:id', component: VerPedidoComponent, data: { titulo: 'Ver Pedido' } },
            { path: 'actualizar/:id', component: ActualizarPedidoComponent, data: { titulo: 'Actualizar Pedido' } },
        ]
    },
    {path: 'gestionarOrdenCompra', component: GestionarOrdenCompraComponent, data: {titulo: 'Gestionar Orden Compra'}}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VentasRoutingModule { }
