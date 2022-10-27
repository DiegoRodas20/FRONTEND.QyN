import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Client } from 'src/app/core/models/client.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { ClientService } from 'src/app/core/services/client.service';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { VerClienteComponent } from './components/ver-cliente/ver-cliente.component';

@Component({
    selector: 'app-gestionar-cliente',
    templateUrl: 'gestionar-cliente.component.html'
})

export class GestionarClienteComponent implements OnInit {

    lClientes: Client[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _clienteService: ClientService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getClientes()
    }

    async getClientes() {
        
        try {
            const data: ResponseData = await this._clienteService.getClientes().toPromise()

            this.Mensaje = data.message
            this.lClientes = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    actualizarCliente(idCliente: number) { 
    
        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']
        dialogConfig.data = idCliente

        const dialogReg = this._dialog.open(ActualizarClienteComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getClientes())
    }

    verCliente(idCliente: number) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = ['modal', 'overflow-y-auto', 'show', 'modal-show']
        dialogConfig.data = idCliente

        const dialogReg = this._dialog.open(VerClienteComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => console.log(result))
    }

}