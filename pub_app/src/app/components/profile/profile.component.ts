import { Component } from "@angular/core";

@Component({
    selector: 'kf-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class KfProfile {
    name: string;
    emal: string;
    password: string;

    constructor() {

    }

    getUser() {
        
    }
}