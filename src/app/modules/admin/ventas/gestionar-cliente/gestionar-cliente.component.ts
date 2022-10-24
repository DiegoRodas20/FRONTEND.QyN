import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
    selector: 'app-gestionar-cliente',
    templateUrl: 'gestionar-cliente.component.html'
})

export class GestionarClienteComponent implements OnInit {

    clientes;
    mensaje;

    constructor(
        private _clienteService: ClienteService
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

    verCliente(id: number) {
        console.log(id)
    }

    actualizarCliente(id: number) {

    }
}