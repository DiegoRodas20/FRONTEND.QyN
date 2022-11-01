import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

    show: boolean = false
    @Input() lArray: any[] = []
    @Input() itemActually: string
    @Output() itemSelected = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    openDropdown() {
        this.show = !this.show
    }

    selectedItem(item: any) {
        this.itemSelected.emit(item)
        this.show = false
    }
}