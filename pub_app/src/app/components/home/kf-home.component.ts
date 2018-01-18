import { Component } from "@angular/core";

@Component({
    selector: 'kf-home',
    templateUrl: './kf-home.component.html',
    styleUrls: ['./kf-home.component.scss']
})

export class KfHomeComponent {
    navLinks: Link[];
    constructor() {
        this.navLinks = [ {
            path: 'profile',
            label: 'Profile'
        },
        {
            path: 'tracker',
            label: 'tracker'
        },
        {
            path: 'check-in',
            label: 'mood'
        },
        {
            path: 'notes',
            label: 'notes'
        }
    ]
    }
}

export interface Link {
        path: string;
        label: string;
}