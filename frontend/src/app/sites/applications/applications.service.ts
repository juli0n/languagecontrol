import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {Applicationlanguages} from "../../datamodels/Applicationlanguages";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private httpClient: HttpClient) { }


  public getAllApplications(): Observable<any> {
    const headers = new HttpHeaders();
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/applications/getAllApplications', {headers: headers}).pipe(
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

  public addActiveLanguage(newActiveLanguage: Applicationlanguages): Observable<any> {
    const headers = new HttpHeaders();

    const head = {
      headers: headers
    };

    const body = {
      newlanguage: JSON.stringify(newActiveLanguage)
    };

    return this.httpClient.post(API_URL + '/applicationlanguages/addActiveLanguage', body, head).pipe(
      catchError(this.handleError)
    );
  }


  public removeActiveLanguage(applicationid: string, languageid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      body: {
        applicationID: applicationid,
        languageID: languageid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/applicationlanguages/removeActiveLanguage', httpOptions).pipe(
      catchError(this.handleError)
    );

  }


  public deleteApplication(applicationid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      body: {
        applicationid: applicationid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/applications/deleteApplication', httpOptions).pipe(
      catchError(this.handleError)
    );

  }


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }

}
