import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { TypeVehicleService } from 'src/app/core/services/typevehicle.service';

@Component({

    selector: 'app-registrar-vehiculo',
    templateUrl: 'registrar-vehiculo.component.html'
})

export class RegistrarVehiculoComponent implements OnInit {

    lTipoVehiculo: any[] = []
    lConductores: any[] = []
    formVehiculo: FormGroup
    modalClass: string = ''

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _vehiculoService: VehiculoService,
        private _typeVehicleService: TypeVehicleService,
        private _driverService: DriverService,
        private _formBuildaer: FormBuilder,

    ) { }

    ngOnInit() {
        this.crearFormVehiculo()
        this.listarTipoVehiculos()
        this.listarDriver()
    }

    crearFormVehiculo(){
        this.formVehiculo = this._formBuildaer.group({
            typeVehicleId: [null, []],
            driverId: [null, []],
            plate: [null, []],
            brand: [null, []],
            color: [null, []],
        })
    }

    async listarTipoVehiculos(){

        try {
            const data: any = await this._typeVehicleService.getTypeVehicle().toPromise()
            this.lTipoVehiculo = data.data
        }
        catch (error) {
            console.log("Error: ",error)
        }
    }

    async listarDriver(){

        try {
            const data: any = await this._driverService.getDriver().toPromise()
            this.lConductores = data.data
        }
        catch (error) {
            console.log("Error: ",error)
        }
    }

    async registrarVehiculo(){
        let form = this.formVehiculo.value
        let Vehiculo: any = {
            typeVehicleId: form.typeVehicleId,
            driverId: form.driverId,
            plate: form.plate,
            brand: form.brand,
            color: form.color,
        }
        try{
            let data = await this._vehiculoService.registrarVehiculo(Vehiculo)
            this.modalClass = ' overflow-y-auto show'
        }
        catch (error) {
            console.log(error)
        }
    }

    modificarCSSModal() {
        this.modalClass = ''
    }

    cerrarVentana() {
        this._router.navigate(['/transporte/gestionarvehiculos'])
    }
}