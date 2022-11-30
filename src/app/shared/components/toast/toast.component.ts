import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toastAnimation } from './toast.animation';


@Component({
    selector: 'toast',
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.scss'],
    animations: [toastAnimation]
})

export class ToastComponent implements OnInit {

    @Input() type: string
    @Input() contenido: string
    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        this.timerClose()
    }

    ngOnDestroy() {
        console.log('TOAST COMPONENT DESTROY')
    }

    timerClose() {
        setTimeout(() => {
            this.onClose()
        }, 6000)
    }

    onClose() {
        this.close.emit(false)
    }

    colorAlert(typeAlert: string) {

        switch (typeAlert) {
            case 'success':
                return 'alert-success'
                break;
            case 'error':
                return 'alert-danger'
                break;
            case 'alert':
                return 'alert-pending'
                break;
            case 'info':
                return 'alert-dark'
                break;
            default:
                return ''
                break;
        }
    }

    iconAlert(typeAlert: string) {
        switch (typeAlert) {
            case 'success':
                return 'ci-check'
                break;
            case 'error':
                return 'alert-octagon'
                break;
            case 'alert':
                return 'alert-triangle'
                break;
            case 'info':
                return 'ci-alert-octagon'
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
            case 'info':
                return 'Información'
                break;
            default:
                return ''
                break;
        }
    }
}