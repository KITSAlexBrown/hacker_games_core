import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kf-notes-view-route',
  templateUrl: './kf-notes-view-route.component.html',
  styleUrls: ['./kf-notes-view-route.component.scss']
})
export class KfNotesViewRouteComponent implements OnInit {

  public notes: any;
  private sub: any;
  private id: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id']; // (+) converts string 'id' to a number
      this.http.get('http://fandanzle.co.uk/api/moods/user/5a609d93ad9b2a3b007031b9?date='+this.id).subscribe(data => {
        this.notes = data['results'].sort(function(a, b){
            return new Date(a.create) < new Date(b.create);
        });
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
      dateString += monthNames[date.getMonth()] + " ";
      dateString += date.getFullYear() + " ";
      return dateString;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
