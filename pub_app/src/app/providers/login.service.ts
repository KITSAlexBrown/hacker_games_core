import { UsersService } from "./users.service";
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private _userLogged: boolean = false;
  public user: User;

  constructor(private usersService: UsersService) { }

  public get userLogged(): boolean {
    return this._userLogged;
  }

  public userAccess(username: string, password: string, email: string): Observable<any> {

     return this.usersService.getUsers().map(users => {
      let found = users.filter(user => user.email === email);
      if (found.length > 0) {
        this._userLogged = true;
        this.user = found[0];
        return Observable.of(true);
      } else {
        return Observable.of(false);
      }
    });

  }

}
