import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Applicationlanguages} from "../../datamodels/Applicationlanguages";
import {Termusages} from "../../datamodels/Termusages";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class TermusageService {

  constructor(private httpClient: HttpClient) { }


  public getAllApplications(): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem("jwt") || '');
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/applications/getAllApplications', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }


  public getAllNotActivatedLanguages(applicationID: string): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem("jwt") || '').append('applicationID', applicationID);
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/terms/getAllNotActivatedLanguages', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }


  public getAllTerms(): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem("jwt") || '');
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/terms/getAllTerms', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  public getAllLanguages(): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem("jwt") || '');
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/languages/getAllLanguages', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }


  public deleteTermusage(termusageid: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || ''),
      body: {
        termusageid: termusageid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/termusages/deleteTermusage', httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  public addNewTermusage(newTermusage: Termusages): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '');

    const head = {
      headers: headers
    };

    const body = {
      newTermusage: JSON.stringify(newTermusage)
    };

    return this.httpClient.post(API_URL + '/termusages/addNewTermusage', body, head).pipe(
      catchError(this.handleError)
    );
  }




  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }

}
