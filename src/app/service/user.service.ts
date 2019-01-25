import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from './api.service';
import { User } from "../model/user.model";
import { QueryOptions } from "../shared/query-options";

const serviceMethod: string = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  public getAllUsers(pageNumber?: number): Observable<User[]> {
    let options = new QueryOptions();
    options.pageNumber = pageNumber;
    options.serviceMethod = serviceMethod;
    return this.getAll(options);
  }
}
