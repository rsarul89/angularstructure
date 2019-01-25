import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Domain } from "../model/domain.model";
import { QueryOptions } from "../shared/query-options";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends Domain> {
  private httpOptions = {};
  private serviceMethod: string;
  private apiUrl = '';
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json'
    };
  }
  protected getAll(queryOptions?: QueryOptions): Observable<T[]> {
    //let qString = queryOptions ? queryOptions.toQueryString() : '';
    this.serviceMethod = queryOptions.serviceMethod;
    return this.httpClient.get(`${this.apiUrl}/${this.serviceMethod}`, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  protected get(id: number, queryOptions?: QueryOptions): Observable<T> {
    this.serviceMethod = queryOptions.serviceMethod;
    return this.httpClient.get(`${this.apiUrl}/${this.serviceMethod}/${id}`, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  protected post(data: T, queryOptions?: QueryOptions): Observable<T> {
    this.serviceMethod = queryOptions.serviceMethod;
    return this.httpClient.post(`${this.apiUrl}/${this.serviceMethod}`, data, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  protected update(id: number, data: T, queryOptions?: QueryOptions): Observable<T> {
    this.serviceMethod = queryOptions.serviceMethod;
    return this.httpClient.put(`${this.apiUrl}/${this.serviceMethod}/${id}`, data, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  protected delete(id: number, queryOptions?: QueryOptions): Observable<any> {
    this.serviceMethod = queryOptions.serviceMethod;
    return this.httpClient.delete(`${this.apiUrl}/${this.serviceMethod}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }
}
