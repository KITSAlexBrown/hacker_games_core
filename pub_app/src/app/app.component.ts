import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './providers/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private loginService: LoginService) {
    if (!this.loginService.userLogged) {
      router.navigate(['/landing']);
    }
  }

}
