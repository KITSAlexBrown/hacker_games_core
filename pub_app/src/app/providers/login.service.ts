import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private _userLogged: boolean = false;
  public user: User;

  constructor() { }

  public get userLogged(): boolean {
    return this._userLogged;
  }

  public userAccess(username: string, password: string, email: string): Observable<boolean> {
    this.user = new User(username, email);
    this._userLogged = true;
    return Observable.of(true);
  }
}
