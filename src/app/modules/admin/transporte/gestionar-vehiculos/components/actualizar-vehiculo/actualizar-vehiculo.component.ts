import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { TypeVehicleService } from 'src/app/core/services/typevehicle.service';

@Component({

    selector: 'app-actualizar-vehiculo',
    templateUrl: 'actualizar-vehiculo.component.html'
})

export class ActualizarVehiculoComponent implements OnInit {

    idVehiculo: string
    lTipoVehiculo: any[] = []
    lConductores: any[] = []
    lEstados: any [] = [{status: true, name: 'Activo'},{status: false, name: 'Inactivo'}]
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
        this._route.params.subscribe(params => {
            this.idVehiculo = params.id
            this.listarVehiculoxID(this.idVehiculo)
        })
    }

    crearFormVehiculo(){
        this.formVehiculo = this._formBuildaer.group({
            idTypeVehicle: [null, [Validators.required]],
            idDriver: [null, [Validators.required]],
            plate: [null, [Validators.required]],
            brand: [null, [Validators.required, Validators.maxLength(20),Validators.pattern('[A-Za-z]*')]],
            color: [null, [Validators.required, Validators.maxLength(20),Validators.pattern('[A-Za-z]*')]],
            status: [null, [Validators.required]]
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
        }
        catch (error) {
            console.log("Error: ",error)
        }
    }

    async actualizarVehiculo(){
        if(this.formVehiculo.invalid){
            return
        }
        let form = this.formVehiculo.value
        let Vehiculo: any = {
            typeVehicleId: +form.idTypeVehicle,
            driverId: +form.idDriver,
            plate: form.plate,
            brand: form.brand,
            color: form.color,
            status: (form.status == "true" )? true : false 
        }

        try {
            let data = await this._vehiculoService.actualizarVehiculo(this.idVehiculo, Vehiculo)
            this.listarVehiculoxID(this.idVehiculo)
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