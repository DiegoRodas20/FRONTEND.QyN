import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/core/services/vehicle.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { TypeVehicleService } from 'src/app/core/services/typevehicle.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Alert } from 'src/app/core/models/alert.model';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AlertService } from 'src/app/shared/services/alert.service';

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
        private _vehiculoService: VehiculoService,
        private _dialogRef: MatDialogRef<RegistrarVehiculoComponent>,
        private _typeVehicleService: TypeVehicleService,
        private _driverService: DriverService,
        private _formBuildaer: FormBuilder,
        private _toastService: ToastService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormVehiculo()
        this.listarTipoVehiculos()
        this.listarDriver()
    }

    crearFormVehiculo() {
        this.formVehiculo = this._formBuildaer.group({
            typeVehicleId: [null, [Validators.required]],
            driverId: [null, [Validators.required]],
            plate: [null, [Validators.required]],
            brand: [null, [Validators.required, Validators.maxLength(20), Validators.pattern('[A-Za-z]*')]],
            color: [null, [Validators.required, Validators.maxLength(20), Validators.pattern('[A-Za-z]*')]],
        })
    }

    async listarTipoVehiculos() {

        try {
            const data: any = await this._typeVehicleService.getTypeVehicle().toPromise()
            this.lTipoVehiculo = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async listarDriver() {

        try {
            const data: any = await this._driverService.getDriver().toPromise()
            this.lConductores = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async registrarVehiculo() {
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
            typeVehicleId: +form.typeVehicleId,
            driverId: +form.driverId,
            plate: form.plate,
            brand: form.brand,
            color: form.color,
        }
        try {
            let data = await this._vehiculoService.registrarVehiculo(Vehiculo)
            this._alertService.openModal({ typeModal: 'success', contenidoModal: data.message })
            this.salir()
        }
        catch (error) {
            console.log(error)
        }
    }

    salir() {
        this._dialogRef.close()
    }

    cssValidate(control: string) {
        if (this.formVehiculo.controls[control].touched) {
            if (this.formVehiculo.controls[control].errors) return 'border-danger'
            else return 'border-success'
        }
        else return ''
    }
}