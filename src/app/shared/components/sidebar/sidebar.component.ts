import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



export interface Menu {
    id: number;
    url: string;
    icon: string;
    title: string;
    childs: Menu[];
}

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    lMenu: Menu[]
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
        this.lMenu = JSON.parse(localStorage.getItem('Usuario')).data.menus
        this.lMenu.push({
            id: -1,
            "title": "Cerrar Sesión",
            "url": "/login",
            "icon": "log-out",
            childs: []
        })
    }

    showSubmenu(idpadre: number) {
        this.idPadre = idpadre
    }

    routerlinkactive(idpadre: number) {
        this.idPadreSeleccionado = idpadre
    }

    cerrarSesion(id: number) {
        if (id == -1){
            localStorage.clear();
            
        }
    }

}
