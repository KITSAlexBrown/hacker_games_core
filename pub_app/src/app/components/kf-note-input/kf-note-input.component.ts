import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kf-note-input',
  templateUrl: './kf-note-input.component.html',
  styleUrls: ['./kf-note-input.component.scss']
})
export class KfNoteInputComponent implements OnInit {

    public rating: number;
    public note: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams['rating']) {
            this.rating = +this.route.snapshot.queryParams['rating'];
        }
    }

    sumbitNote() {
        console.log({'rating': this.rating, 'note': this.note});
    }

}
