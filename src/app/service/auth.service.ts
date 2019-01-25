import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AuthModel } from "../model/auth.model";
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { QueryOptions } from '../shared/query-options';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService<AuthModel> {
  private user = new BehaviorSubject<AuthModel>(null);
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.userEmitChange(this.getUser());
  }
  public userEmitChange(usr: AuthModel) {
    this.user.next(usr);
  }
  private getUser(): AuthModel {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  public LoggedInUser(): Observable<AuthModel> {
    return this.user.asObservable();
  }
  public IsLoggedIn(): Observable<boolean> {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user)
      this.isLoggedIn.next(true);
    else
      this.isLoggedIn.next(false);

    return this.isLoggedIn.asObservable();
  }
  public login(usr: AuthModel) {
    let options = new QueryOptions();
    options.serviceMethod = 'users/authenticate';
    if (usr && (usr.username != '' && usr.password != null)) {
      usr.isLoggedIn = true;
      return this.post(usr, options)
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isLoggedIn.next(true);
            this.userEmitChange(user);
          }
          return user;
        }));
    }
  }
  public logout(): void {
    localStorage.removeItem('currentUser');
    let usr: AuthModel = new AuthModel();
    this.isLoggedIn.next(false);
    this.userEmitChange(usr);
  }
  public getAllUsers() {
    let options = new QueryOptions();
    options.serviceMethod = 'users';
    return this.getAll(options);
  }

  public getById(id: number) {
    let options = new QueryOptions();
    options.serviceMethod = 'users';
    return this.get(id, options);
  }

  public register(user: AuthModel) {
    let options = new QueryOptions();
    options.serviceMethod = 'users/register';
    return this.post(user, options);
  }

  public updateUser(user: AuthModel) {
    let options = new QueryOptions();
    options.serviceMethod = 'users';
    return this.update(user.id, user, options);
  }

  public deleteUser(id: number) {
    let options = new QueryOptions();
    options.serviceMethod = 'users';
    return this.delete(id, options);
  }
}
