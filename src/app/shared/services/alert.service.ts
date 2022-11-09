import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    private _opened: boolean;
    private _typeModal: string;
    private _contenidoModal: string;
    constructor() {
        this._opened = false;
        this._typeModal = ''
        this._contenidoModal = ''
    }

    // Listar Cliente por ID
    openModal(content: {
        typeModal: 'success' | 'error' | 'alert',
        contenidoModal: string,
    }) {
        this._typeModal = content.typeModal;
        this._contenidoModal = content.contenidoModal;
        this._opened = true;
    }

    closeModal(event) {
        this._opened = false
    }

    get opened() {
        return this._opened
    }

    get typeModal() {
        return this._typeModal
    }

    get contenidoModal() {
        return this._contenidoModal
    }

}
