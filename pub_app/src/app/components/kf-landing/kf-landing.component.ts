import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './kf-landing.component.html',
  styleUrls: ['./kf-landing.component.scss']
})
export class LandingComponent  {
  public email: string = "";
  public  showAccessForm: boolean = false;
  public errorMessage: string = "";

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showAccessForm = true;
    }, 2000);
  }

  public userLogin() {
    this.loginService.userAccess(this.email).subscribe(res => {
      console.log("login result", res["value"]);
      if (res["value"] === true) {
        this.router.navigateByUrl('/check-in');
        this.errorMessage = "";
      } else {
        this.errorMessage = "Please complete all fields";
      }
    })
  }

}
