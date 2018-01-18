import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kf-note-input',
  templateUrl: './kf-note-input.component.html',
  styleUrls: ['./kf-note-input.component.scss']
})
export class KfNoteInputComponent implements OnInit {

    public rating: number;
    public noteId: number;
    public noteText: string;
    public currentNote: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
    ) { 
    }

    ngOnInit() {
        if (this.route.snapshot.queryParams['rating']) {
            this.rating = +this.route.snapshot.queryParams['rating'];
        } else if (this.route.snapshot.queryParams['noteId']) {
            let id = this.route.snapshot.queryParams['noteId'];
            this.http.get('http://fandanzle.co.uk/api/moods/id/' + id).subscribe(data => {
                this.currentNote = data['results'];
                this.noteText = this.currentNote.note_txt;
            });
        }
    }

    actionNote() {
        if (this.route.snapshot.queryParams['rating']) {
            this.sumbitNote();
        } else {
            this.editNote(this.currentNote);
        }
    }

    sumbitNote() {
        let body = {
            "user": "5a609d93ad9b2a3b007031b9",
            "mood": this.rating,
            "note": this.noteText
        }
        this.http.post('http://fandanzle.co.uk/api/moods', body).subscribe(data => {
            this.router.navigate(['/notes']);
        });
    }

    editNote(note) {
        let body = {
          "user": "5a609d93ad9b2a3b007031b9",
          "mood": note.mood,
          "note": this.noteText
      }
        this.http.post('http://fandanzle.co.uk/api/moods/id/' + note._id, body).subscribe(data => {
          this.router.navigate(['/notes']);
      });
      }

}
