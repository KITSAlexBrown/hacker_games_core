import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const USERS = [
    { name: "Superman", email: "superman@hero.co", avatar: "superman.png"},
    { name: "Spiderman", email: "spiderman@hero.co", avatar: "batman.png"}
];

@Injectable()
export class UsersService {
    public getUsers(): Observable<any> {
        return Observable.from(USERS).merge().toArray();
    }
}