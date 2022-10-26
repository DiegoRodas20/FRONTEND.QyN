import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    lMenu: any[]
    idPadre: number = 0
    idPadreSeleccionado: number = 0
    openSubmenu = false
    pruebaString: string

    constructor(
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.setMenu()
    }

    setMenu() {
        this.lMenu = [
            {
                "idpadre": 0,
                "titulo": "Dashboard",
                "url": "/dashboard",
                "icono": "home"
            },
            // {
            //     "idpadre": 1,
            //     "titulo": "Usuarios",
            //     "icono": "users",
            //     "submenu": [
            //         {
            //             "idhijo": 0,
            //             "titulo": "Gestionar Usuario",
            //             "url": "/usuarios/gestionarusuario",
            //             "icono": "user"
            //         }
            //     ],
            // },
            {
                "idpadre": 1,
                "titulo": "Almacén",
                "icono": "clipboard-list",
                "submenu": [
                    // {
                    //     "idhijo": 0,
                    //     "titulo": "Gestionar Almacén",
                    //     "url": "/almacen/gestionaralmacen",
                    //     "icono": "clipboard-list"
                    // },
                    {
                        "idhijo": 0,
                        "titulo": "Gestionar Producto",
                        "url": "/almacen/gestionarproducto",
                        "icono": "box"
                    },
                    // {
                    //     "idhijo": 2,
                    //     "titulo": "Gestionar Movimiento",
                    //     "url": "/almacen/gestionarmovimiento",
                    //     "icono": "package-search"
                    // }
                ],
            },
            {
                "titulo": "Ventas",
                "idpadre": 2,
                "icono": "shopping-cart",
                "submenu": [
                    // {
                    //     "idhijo": 0,
                    //     "titulo": "Gestionar Venta",
                    //     "url": "/ventas/gestionarventa",
                    //     "icono": "shopping-cart"
                    // },
                    {
                        "idhijo": 0,
                        "titulo": "Gestionar Cliente",
                        "url": "/ventas/gestionarcliente",
                        "icono": "users"
                    },
                    {
                        "idhijo": 1,
                        "titulo": "Gestionar Pedido",
                        "url": "/ventas/gestionarpedido",
                        "icono": "package"
                    },
                    {
                      "idhijo": 2,
                      "titulo": "Gestionar Orden de Compra",
                      "url": "/ventas/gestionarOrdenCompra",
                      "icono": "package"
                  }
                ],
            },
            // {
            //     "titulo": "Fabricación",
            //     "idpadre": 4,
            //     "icono": "factory",
            //     "submenu": [
            //         {
            //             "idhijo": 0,
            //             "titulo": "Gestionar Fabricación",
            //             "url": "/fabricacion/gestionarfabricacion",
            //             "icono": "factory"
            //         },
            //         {
            //             "idhijo": 1,
            //             "titulo": "Gestionar Formulación",
            //             "url": "/fabricacion/gestionarformulacion",
            //             "icono": "sigma"
            //         }
            //     ]
            // },
            {
                "titulo": "Transporte",
                "idpadre": 3,
                "icono": "truck",
                "submenu": [
                    // {
                    //     "idhijo": 0,
                    //     "titulo": "Asignar Transporte",
                    //     "url": "/transporte/asignartransporte",
                    //     "icono": "home"
                    // },
                    {
                        "idhijo": 0,
                        "titulo": "Gestionar Vehículos",
                        "url": "/transporte/gestionarvehiculos",
                        "icono": "home"
                    }
                ]
            },
            {
                "titulo": "Cerrar Sesión",
                "url": "/login",
                "icono": "log-out"
            },
        ]
    }

    showSubmenu(idpadre: number) {
        this.idPadre = idpadre
    }

    routerlinkactive(idpadre: number) {
        this.idPadreSeleccionado = idpadre
        console.log(this.idPadreSeleccionado)
    }

}
