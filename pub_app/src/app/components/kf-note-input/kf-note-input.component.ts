import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kf-note-input',
  templateUrl: './kf-note-input.component.html',
  styleUrls: ['./kf-note-input.component.scss']
})
export class KfNoteInputComponent implements OnInit {

    private sub: any;
    public rating: number;
    public note: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['rating']) {
                this.rating = +params['rating'];
            }
        });
    }

    sumbitNote() {
        console.log({'rating': this.rating, 'note': this.note});
    }

}
