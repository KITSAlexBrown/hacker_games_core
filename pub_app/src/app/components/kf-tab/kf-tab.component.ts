import { Component } from "@angular/core";

@Component({
    selector: 'kf-tab',
    templateUrl: './kf-tab.component.html',
    styleUrls: ['./kf-tab.component.scss']
})

export class KfTabComponent {
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