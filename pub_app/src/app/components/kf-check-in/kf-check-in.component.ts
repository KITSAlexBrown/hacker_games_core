import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kf-check-in',
  templateUrl: './kf-check-in.component.html',
  styleUrls: ['./kf-check-in.component.scss']
})
export class KfCheckInComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    public moodRating: number;

    setMoodRating(rating: number) {
        this.moodRating = rating;
    }

    submitRating() {
        if (this.moodRating) {
            this.router.navigate(['/notes/create'], {queryParams: {'rating': this.moodRating}});
        }
    }


}
