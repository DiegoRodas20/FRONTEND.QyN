import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { ActualizarVehiculoComponent } from './components/actualizar-vehiculo/actualizar-vehiculo.component';
import { RegistrarVehiculoComponent } from './components/registrar-vehiculo/registrar-vehiculo.component';
import { VerVehiculoComponent } from './components/ver-vehiculo/ver-vehiculo.component';

@Component({
    selector: 'app-gestionar-vehiculos',
    templateUrl: 'gestionar-vehiculos.component.html'
})

export class GestionarVehiculosComponent implements OnInit {

    lVehiculos: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _vehiculoService: VehiculoService,
        private _router: Router,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getVehiculos()
    }

    async getVehiculos() {
        try {
            const data: any = await this._vehiculoService.getVehiculos().toPromise()
            this.Mensaje = data.message
            this.lVehiculos = data.data
            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    registrarVehiculo() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(RegistrarVehiculoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getVehiculos())

        // this._router.navigate(['/transporte/gestionarvehiculos/registrar'])
    }

    verVehiculo(idVehiculo: string) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = false
        dialogConfig.data = idVehiculo
        dialogConfig.width = '50rem'

        const dialogReg = this._dialog.open(VerVehiculoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => {})

        // this._router.navigate(['/transporte/gestionarvehiculos/ver/' + idVehiculo])
    }
    actualizarVehiculo(idVehiculo: string) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = false
        dialogConfig.data = idVehiculo

        const dialogReg = this._dialog.open(ActualizarVehiculoComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(result => this.getVehiculos())

        // this._router.navigate(['/transporte/gestionarvehiculos/actualizar/' + idVehiculo])
    }
}