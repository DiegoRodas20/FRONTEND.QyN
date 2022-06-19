import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogoService } from 'src/app/core/services/catalogo.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    lCatalogo: any[] = []
    constructor(
        private _catalogoService: CatalogoService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.getCatalogo()
    }

    async getCatalogo() {

        try {

            const data: any = await this._catalogoService.getCatalogo().toPromise()
            console.log(data)

            this.lCatalogo = data.data
            // this.Mensaje = data.message
            // this.lUsuarios = data.data

            // code: [null, []],
            // id: [null, []],
            // name: [null, []],
            // purchasePrice: [null, []],
            // salesPrice: [null, []],
            // showInCatalog: [null, []],
            // stock: [null, []],
            // type: [null, []],
            // urlImage: [null, []],
        }
        catch (error) {
            console.log("Error: ", error)
        }

    }
    // getCatalogo
}