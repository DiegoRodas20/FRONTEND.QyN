import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})

export class AlertComponent implements OnInit {

    // Contenido modal
    @Input() type: string
    @Input() contenido: string

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    onClose() {
        this.open = false
        this.close.emit(this.open)
    }

    colorAlert(typeAlert: string | 'success' | 'error' | 'alert') {

        switch (typeAlert) {
            case 'success':
                return 'text-success'
                break;
            case 'error':
                return 'text-danger'
                break;
            case 'alert':
                return 'text-warning'
                break;
            default:
                return ''
                break;
        }
    }

    iconAlert(typeAlert: string) {
        switch (typeAlert) {
            case 'success':
                return 'check-circle'
                break;
            case 'error':
                return 'x-circle'
                break;
            case 'alert':
                return 'alert-circle'
                break;
            default:
                return ''
                break;
        }
    }

    titleAlert(typeAlert: string) {
        switch (typeAlert) {
            case 'success':
                return 'Éxito'
                break;
            case 'error':
                return 'Error'
                break;
            case 'alert':
                return 'Atención'
                break;
            default:
                return ''
                break;
        }
    }
}