import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { GestionarMovimientoComponent } from './gestionar-movimiento/gestionar-movimiento.component';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';
import { RegistrarProveedorComponent } from './gestionar-proveedor/components/registrar-proveedor/registrar-proveedor.component';
import { VerProveedorComponent } from './gestionar-proveedor/components/ver-proveedor/ver-proveedor.component';
import { ActualizarProveedorComponent } from './gestionar-proveedor/components/actualizar-proveedor/actualizar-proveedor.component';


const routes: Routes = [

    { path: 'gestionaralmacen', component: GestionarAlmacenComponent, data: { titulo: 'Gestionar Almacén' } },
    { path: 'gestionarproducto', component: GestionarProductoComponent, data: { titulo: 'Gestionar Producto' } },
    { path: 'gestionarmovimiento', component: GestionarMovimientoComponent, data: { titulo: 'Gestionar Movimiento' } },
    { path: 'gestionarproveedor', component: GestionarProveedorComponent, data: { titulo: 'Gestionar Proveedor' } },
    { path: 'gestionarproveedor', children: [ 
    {path: 'registrar', component: RegistrarProveedorComponent, data: { titulo: 'Registrar Proveedor'}},
    {path: 'ver/:id', component:  VerProveedorComponent, data: { titulo: 'Ver Proveedor'}},
    {path: 'actualizar/:id', component: ActualizarProveedorComponent, data: { titulo: 'Actualizar Proveedor'}},
    ]},
    
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlmacenRoutingModule { }