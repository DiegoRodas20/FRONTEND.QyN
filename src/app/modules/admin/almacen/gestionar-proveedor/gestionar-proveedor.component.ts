import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { ActualizarProveedorComponent } from './components/actualizar-proveedor/actualizar-proveedor.component';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor.component';
import { VerProveedorComponent } from './components/ver-proveedor/ver-proveedor.component';

@Component({
    selector: 'app-gestionar-proveedor',
    templateUrl: 'gestionar-proveedor.component.html'
})

export class GestionarProveedorComponent implements OnInit {

    lProveedores: any[] = []
    Mensaje: string
    filtro = new FormControl();
    p: number = 1;

    constructor(
        private _proveedorService: SupplierService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getProveedor()
    }

    async getProveedor() {
        try {
            const data: any = await this._proveedorService.getProveedores().toPromise()
            this.Mensaje = data.message
            this.lProveedores = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    registrarProveedor() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.autoFocus = false
        
        const dialogReg = this._dialog.open(RegistrarProveedorComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(() => this.getProveedor())
    }

    verProveedor(idProveedor: string) {

        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.data = idProveedor
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(VerProveedorComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(() => this.getProveedor())
    }

    actualizarProveedor(idProveedor: string) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '45rem'
        dialogConfig.data = idProveedor
        dialogConfig.autoFocus = false

        const dialogReg = this._dialog.open(ActualizarProveedorComponent, dialogConfig)
        dialogReg.afterClosed().subscribe(() => this.getProveedor())
    }

}