import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarOrdenCompraComponent } from './gestionar-orden-compra/gestionar-orden-compra.component';
import { ActualizarPedidoComponent } from './gestionar-pedido/components/actualizar-pedido/actualizar-pedido.component';
import { VerPedidoComponent } from './gestionar-pedido/components/ver-pedido/ver-pedido.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { VerOrdenCompraComponent } from './gestionar-orden-compra/ver-orden-compra/ver-orden-compra.component';
import { ActualizarOrdenCompraComponent } from './gestionar-orden-compra/actualizar-orden-compra/actualizar-orden-compra.component';
import { VisualizarReportesComponent } from './visualizar-reportes/visualizar-reportes.component';

const routes: Routes = [

    { path: 'gestionarventa', component: GestionarVentaComponent, data: { titulo: 'Gestionar Venta' } },
    { path: 'gestionarcliente', component: GestionarClienteComponent, data: { titulo: 'Gestionar Cliente' } },
    { path: 'visualizarreporte', component: VisualizarReportesComponent, data: { titulo: 'Visualizar Reporte' } },
    {
        path: 'gestionarpedido', children: [
            { path: '', component: GestionarPedidoComponent, data: { titulo: 'Gestionar Pedido' } },
            { path: 'ver/:id', component: VerPedidoComponent, data: { titulo: 'Ver Pedido' } },
            { path: 'actualizar/:id', component: ActualizarPedidoComponent, data: { titulo: 'Actualizar Pedido' } },
        ]
    },
    {
        path: 'gestionarOrdenCompra', children: [
            { path: '', component: GestionarOrdenCompraComponent, data: { titulo: 'Gestionar Orden Compra' } },
            { path: 'ver/:id', component: VerOrdenCompraComponent, data: { titulo: 'Ver Orden Compra' } },
            { path: 'actualizar/:id', component: ActualizarOrdenCompraComponent, data: { titulo: 'Ver Orden Compra' } }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VentasRoutingModule { }
