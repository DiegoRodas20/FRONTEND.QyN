import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';


const COMPONENTS = [
    MatDialogModule,
]

@NgModule({
    declarations: [],
    imports: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ],

    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    ],
})
export class MaterialModule { }
