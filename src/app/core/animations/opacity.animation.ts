import { animate, style, transition, trigger } from "@angular/animations";


export const opacity = trigger('opacity',
    [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('200ms', style({ opacity: 1 }))
        ])
    ]
);