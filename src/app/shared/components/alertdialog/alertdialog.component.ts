import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-alertdialog',
    templateUrl: 'alertdialog.component.html',
    styleUrls: ['./alertdialog.component.scss']
})

export class AlertDialogComponent implements OnInit {

    @Input() titulo: string
    @Input() contenido: string
    @Input() estilo: string
    @Output() closestyle = new EventEmitter<string>();

    constructor( ) { }

    ngOnInit() {}

    onClose(){
        this.closestyle.emit('')
    }

}