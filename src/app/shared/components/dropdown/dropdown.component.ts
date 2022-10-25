import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: 'dropdown.component.html',
    // styleUrls: ['dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
    
    @Input() show: boolean = true
    
    constructor( ) { }

    ngOnInit() { }
    
    openDropdown(){
        this.show = false
    }
}