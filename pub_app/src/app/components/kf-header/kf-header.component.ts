import { Component } from "@angular/core";

@Component({
    selector: 'kf-header',
    templateUrl: './kf-header.component.html',
    styleUrls: ['./kf-header.component.scss']
})

export class KfHeaderComponent {
    public showProfile: boolean = false;
    constructor() {

    }

    closeProfile() {
        this.showProfile = false;
    }
}