import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kf-notes-view',
  templateUrl: './kf-notes-view.component.html',
  styleUrls: ['./kf-notes-view.component.scss']
})
export class KfNotesViewComponent implements OnInit {

    public notes = [
        {
            rating: 2,
            text: "Felt rubbish.  I couldn't fix a bug"
        },
        {
          rating: 5,
          text: "I won the Hackathon!  Woo"
        }
    ]
    
  constructor() { }

  ngOnInit() {
  }

}
