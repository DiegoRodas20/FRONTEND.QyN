import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';

@Component({
    selector: 'app-asignar-transporte',
    templateUrl: 'asignar-transporte.component.html'
})

export class AsignarTransporteComponent implements OnInit {
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

    async getVehiculos() {
        try {
            const data: any = await this._vehiculoService.getVehiculos().toPromise()
            this.Mensaje = data.message
            this.lVehiculos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    verPedidosAsignados(idVehiculo: string) {
        this._router.navigate(['/transporte/asignartransporte/' + idVehiculo])
    }

}