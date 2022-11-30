import { animate, state, style, transition, trigger } from "@angular/animations";


export const toastAnimation = trigger('toastAnimation',
    [
        transition(':enter', [
            style({
                transform: 'translateY(-100%)',
                opacity: 0
            }),
            animate('300ms', style({
                transform: 'translateY(100)',
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({
                transform: 'translateY(100)',
                opacity: 1
            }),
            animate('200ms', style({
                transform: 'translateY(100%)',
                opacity: 0
            }))
        ]),
    ]
);