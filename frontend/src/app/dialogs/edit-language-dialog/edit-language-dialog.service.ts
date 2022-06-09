import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Terms} from "../../datamodels/Terms";
import {Languages} from "../../datamodels/Languages";

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EditLanguageDialogService {

  constructor(private httpClient: HttpClient) { }



  public deleteLanguage(languageid: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders(),
      body: {
        languageid: languageid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/languages/deleteLanguage', httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  public addNewLanguage(newLanguage: Languages): Observable<any> {
    const headers = new HttpHeaders();

    const head = {
      headers: headers
    };

    const body = {
      language: JSON.stringify(newLanguage)
    };

    return this.httpClient.post(API_URL + '/languages/addNewLanguage', body, head).pipe(
      catchError(this.handleError)
    );
  }



  public updateLanguage(updatedLanguage: Languages): Observable<any> {
    const headers = new HttpHeaders();

    const head = {
      headers: headers
    };

    const body = {
      language: JSON.stringify(updatedLanguage)
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
