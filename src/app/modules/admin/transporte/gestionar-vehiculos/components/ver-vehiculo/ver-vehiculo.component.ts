import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { TypeVehicleService } from 'src/app/core/services/typevehicle.service';

@Component({

    selector: 'app-ver-vehiculo',
    templateUrl: 'ver-vehiculo.component.html' 
})

export class VerVehiculoComponent implements OnInit {

    idVehiculo: string
    lTipoVehiculo: any[] = []
    lConductores: any[] = []
    formVehiculo: FormGroup

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
        this._route.params.subscribe(params => {
            this.idVehiculo = params.id
            this.listarVehiculoxID(this.idVehiculo)
        })
    }
    crearFormVehiculo(){
        this.formVehiculo = this._formBuildaer.group({
            idTypeVehicle: [null, []],
            idDriver: [null, []],
            plate: [null, []],
            brand: [null, []],
            color: [null, []],
            status: [null, []]
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

    async listarVehiculoxID(idVehiculo: string){

        try{
            const data: any = await this._vehiculoService.gestVehiculoxID(idVehiculo).toPromise()
            this.formVehiculo.patchValue(data.data)
            console.log(data.data)
        }
        catch (error) {
            console.log("Error: ",error)
        }
    }
    cerrarVentana() {
        this._router.navigate(['/transporte/gestionarvehiculos'])
    }
}