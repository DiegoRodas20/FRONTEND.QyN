import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';

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
    ) { }
        
    ngOnInit() {
        this.getVehiculos()
     }

     async getVehiculos(){
        try {
            const data: any = await this._vehiculoService.getVehiculos().toPromise()
            this.Mensaje = data.message
            this.lVehiculos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
     }

     registrarVehiculo(){
        this._router.navigate(['/transporte/gestionarvehiculos/registrar'])
     }
     verVehiculo(idVehiculo: string){
        this._router.navigate(['/transporte/gestionarvehiculos/ver/' + idVehiculo])
     }
     actualizarVehiculo(idVehiculo: string){
        this._router.navigate(['/transporte/gestionarvehiculos/actualizar/' + idVehiculo])
     }
}