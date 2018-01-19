import { Component, Output, EventEmitter } from "@angular/core";


@Component({
    selector: 'kf-profile',
    templateUrl: './kf-profile.component.html',
    styleUrls: ['./kf-profile.component.scss']
})

export class KfProfile {
    name: string;
    emal: string;
    password: string;
    @Output() close = new EventEmitter<any>();

    constructor() {

    }

    updateUser() {
        console.log("update user data");
        this.close.next();
    }

}
