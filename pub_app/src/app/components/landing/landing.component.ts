import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  {
  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor(private router: Router, private loginService: LoginService) {
  }

  public userLogin() {
    console.log(this.name);
    this.loginService.userAccess("Superman", "test", "superma@action.it").subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/check-in');
      }
    })
  }

}
