import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shell',
    templateUrl: 'shell.component.html'
})

export class ShellComponent implements OnInit {

    modePage
    changeMode = false

    constructor() { }

    ngOnInit() {
        this.modePage = document.querySelector('html')
    }

    darkMode() {

        if (!this.changeMode) {
            this.modePage.classList.add('dark')
            this.modePage.classList.remove('light')
            this.changeMode = true
        }
        else {
            this.modePage.classList.add('light')
            this.modePage.classList.remove('dark')
            this.changeMode = false
        }
    }
}