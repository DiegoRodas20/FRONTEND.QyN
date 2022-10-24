import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestionar-cliente',
    templateUrl: 'gestionar-cliente.component.html'
})

export class GestionarClienteComponent implements OnInit {

    clientes;
    mensaje;

    /*lCliente: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1; */

    constructor(
        private _clienteService: ClienteService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.getClients()
    }

    async getClients() {
        let data = await this._clienteService.getClientes().toPromise()

        this.clientes = data.data;
        this.mensaje = data.message;

        console.log(this.clientes)
    }

    verCliente(id: string) {
        this._router.navigate(['/ventas/gestionarcliente/ver/' + id])
    }

    actualizarCliente(id: string) {
        this._router.navigate(['/ventas/gestionarcliente/actualizar/' + id])
    }
}