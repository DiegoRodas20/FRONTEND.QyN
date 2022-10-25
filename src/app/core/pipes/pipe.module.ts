
import { NgModule } from '@angular/core';
import { FilterTablePipe } from './filterTable.pipe';

const PIPES = [
    FilterTablePipe
]

@NgModule({
    declarations: [
        PIPES
    ],
    exports: [
        PIPES
    ],
})

export class PipeModule { }