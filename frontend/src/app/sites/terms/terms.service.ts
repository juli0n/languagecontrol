import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private httpClient: HttpClient) { }


  public getAllTerms(): Observable<any> {
    const headers = new HttpHeaders();
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/terms/getAllTerms', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  public getAllLanguages(): Observable<any> {
    const headers = new HttpHeaders();
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/languages/getAllLanguages', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }


  public getAllApplicationsForTerm(termid: string): Observable<any> {
    const headers = new HttpHeaders().set('termid', termid);
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/applications/getAllApplicationsForTerm', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }



  public deleteTerm(termid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      body: {
        termid: termid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/terms/deleteTerm', httpOptions).pipe(
      catchError(this.handleError)
    );
  }





  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }

}
