import { Component, Input } from '@angular/core';

@Component({
    selector: 'kf-icon-link',
    templateUrl: './kf-icon-link.component.html',
    styleUrls: ['./kf-icon-link.component.scss']
})

export class KfIconLink {
    @Input() route: string;
}