import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';

const routes: Routes = [

    { path: 'gestionaralmacen', component: GestionarAlmacenComponent, data: { titulo: 'Gestionar Almacén' } },
    { path: 'gestionarproducto', component: GestionarProductoComponent, data: { titulo: 'Gestionar Producto' } },
    { path: 'gestionarmovimiento', component: GestionarMovimientoComponent, data: { titulo: 'Gestionar Movimiento' } },
    { path: 'gestionarproveedor', component: GestionarProveedorComponent, data: { titulo: 'Gestionar Proveedor' } },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlmacenRoutingModule { }