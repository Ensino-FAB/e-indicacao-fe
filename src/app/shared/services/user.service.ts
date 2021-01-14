import { User } from './../../core/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // tslint:disable-next-line:variable-name
  private _user: User;
  // tslint:disable-next-line:variable-name
  private _userKey = 'sisplaer-current-user';

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
    localStorage.setItem(this._userKey, JSON.stringify(user));
  }

  constructor() {
    try {
      this._user = JSON.parse(localStorage.getItem(this._userKey)) as User;
    } catch {
      this._user = null;
    }
  }
}
