import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable({
    providedIn: 'root'
})
export class FirebaseStorageService {

    constructor(
        private _storage: AngularFireStorage,
        private _loaderService: LoaderService

    ) { }

    //Tarea para subir archivo
    private tareaCloudStorage(nombreArchivo: string, datos: any) {
        return this._storage.upload(nombreArchivo, datos);
    }

    //Referencia del archivo
    private referenciaCloudStorage(nombreArchivo: string) {
        return this._storage.ref(nombreArchivo);
    }

    async subirArchivo(file: File): Promise<string> {
        this._loaderService.open()
        return new Promise(async (resolve, reject) => {
            let numberOnly = new Date().getTime();
            let finalName = String(numberOnly) + file.name
            let referencia = this.referenciaCloudStorage(finalName)
            await this._storage.upload(finalName, file)
                .then((snapshot) => referencia.getDownloadURL().subscribe((downloadUrl) => resolve(downloadUrl)))
                .finally(() => this._loaderService.close());
        })
    }

}
