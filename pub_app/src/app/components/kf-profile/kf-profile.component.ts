import { Component } from "@angular/core";

@Component({
    selector: 'kf-profile',
    templateUrl: './kf-profile.component.html',
    styleUrls: ['./kf-profile.component.scss']
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
