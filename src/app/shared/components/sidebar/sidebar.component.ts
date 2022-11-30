import { Component, OnInit } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
        this.setMenu()
        this.routerlinkactive(1)
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
        if (id == -1) localStorage.clear();
    }

    menuCondition(menu: Menu){
        if(menu.childs.length){
            this.showSubmenu(menu.id)
        }
        else {
            this.routerlinkactive(menu.id)
            this.showSubmenu(menu.id)
            this.cerrarSesion(menu.id)
        }
    }

}
