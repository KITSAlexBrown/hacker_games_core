import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kf-notes-view',
  templateUrl: './kf-notes-view.component.html',
  styleUrls: ['./kf-notes-view.component.scss']
})
export class KfNotesViewComponent implements OnInit {

    public notes: any;
    
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.http.get('http://fandanzle.co.uk/api/moods/user/5a609d93ad9b2a3b007031b9').subscribe(data => {
        this.notes = data['results'].sort(function(a, b){
            return new Date(a.create) < new Date(b.create);
        });
    });
  }

  editNote(noteId) {
      this.router.navigate(['/notes/create'], {queryParams: {'noteId': noteId}});
  }

  createDateString(timestamp) {
      let date = new Date(timestamp);
      let dateString = "";
      let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      dateString = date.getDate() + " ";
      dateString += monthNames[date.getMonth() - 1] + " ";
      dateString += date.getFullYear() + " ";
      return dateString;
  }

}
