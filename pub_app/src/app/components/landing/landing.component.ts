import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  {
  public name: string = "Superman";
  public email: string = "superman@hero.co";
  public password: string = "xxxxxxxx";

  constructor(private router: Router, private loginService: LoginService) {
  }

  public userLogin() {
    console.log(this.name);
    this.loginService.userAccess(this.name, this.password, this.email).subscribe(res => {
      console.log("login result", res);
      if (res.value) {
        this.router.navigateByUrl('');
      }
    })
  }

}
