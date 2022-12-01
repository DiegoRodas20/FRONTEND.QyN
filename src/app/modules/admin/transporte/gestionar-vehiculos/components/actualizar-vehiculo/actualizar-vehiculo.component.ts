import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { TypeVehicleService } from 'src/app/core/services/typevehicle.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from 'src/app/core/models/alert.model';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';

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
        private _vehiculoService: VehiculoService,
        private _typeVehicleService: TypeVehicleService,
        private _driverService: DriverService,
        private _formBuildaer: FormBuilder,
        private _dialogRef: MatDialogRef<ActualizarVehiculoComponent>,
        private _toastService: ToastService,
        private _alertService: AlertService,

        @Inject(MAT_DIALOG_DATA) private _dialogData
    ) { }

    ngOnInit() {
        this.crearFormVehiculo()
        this.listarTipoVehiculos()
        this.listarDriver()

        this.idVehiculo = this._dialogData
        this.listarVehiculoxID(this.idVehiculo)
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

        if (this.formVehiculo.invalid) {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._toastService.open(contenido)
            this.formVehiculo.markAllAsTouched()
            return
        }
        
        let form = this.formVehiculo.value
        let Vehiculo: any = {
            typeVehicleId: +form.idTypeVehicle,
            driverId: +form.idDriver,
            plate: form.plate,
            brand: form.brand,
            color: form.color,
            status: (form.status == "true"  || form.status == true )? true : false 
        }

        try {
            let data = await this._vehiculoService.actualizarVehiculo(this.idVehiculo, Vehiculo)
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
            this.salir()
            
        }
        catch (error) {
            console.log(error)
        }
    }

    cssValidate(control: string) {
        if (this.formVehiculo.controls[control].touched) {
            if (this.formVehiculo.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }

    salir() {
        this._dialogRef.close()
    }
}