import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/services/product.service';

@Component({
    selector: 'app-gestionar-producto',
    templateUrl: 'gestionar-producto.component.html'
})

export class GestionarProductoComponent implements OnInit {

    lProductos: any[] = []
    Mensaje: string

    constructor(
        private _productoService: ProductoService
    ) { }

    ngOnInit() {
        this.getProductos()
    }

    async getProductos() {

        try {

            const data: any = await this._productoService.geProductos().toPromise()
            console.log(data)

            this.Mensaje = data.message
            this.lProductos = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }

}