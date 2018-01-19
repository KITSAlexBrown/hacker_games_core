import { Component } from "@angular/core";

@Component({
    selector: 'kf-tab',
    templateUrl: './kf-tab.component.html',
    styleUrls: ['./kf-tab.component.scss']
})

export class KfTabComponent {
    navLinks: Link[];
    constructor() {
        this.navLinks = [
            {
                path: 'tracker',
                label: 'tracker',
                icon: 'ic_tracker.png'
            },
            {
                path: 'check-in',
                label: 'mood',
                icon: 'ic_mood.png'
            },
            {
                path: 'notes',
                label: 'notes',
                icon: 'ic_notes.png'
            },
            {
                path: 'chat',
                label: 'Chat',
                icon: 'ic_chat.png'
            }
    ]
    }
}

export interface Link {
        path: string;
        label: string;
        icon: string
}