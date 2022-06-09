import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Languages} from "../../datamodels/Languages";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private httpClient: HttpClient) { }



  public getAllLanguages(): Observable<any> {
    const headers = new HttpHeaders();
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/languages/getAllLanguages', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }


  public changeLanguage(language: Languages): Observable<any> {
    const headers = new HttpHeaders();

    const head = {
      headers: headers
    };

    const body = {
      language: JSON.stringify(language)
    };

    return this.httpClient.post(API_URL + '/languages/updateLanguage', body, head).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }


}
