import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {Terms} from "../../datamodels/Terms";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class EditTermDialogService {

  constructor(private httpClient: HttpClient) { }



  public addNewTerm(newTerm: Terms): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '');

    const head = {
      headers: headers
    };

    const body = {
      newterm: JSON.stringify(newTerm)
    };

    return this.httpClient.post(API_URL + '/terms/addNewTerm', body, head).pipe(
      catchError(this.handleError)
    );
  }


  public updateTerm(updatedTerm: Terms): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '');

    const head = {
      headers: headers
    };

    const body = {
      updatedTerm: JSON.stringify(updatedTerm)
    };

    return this.httpClient.post(API_URL + '/termlanguages/updateTermlanguages', body, head).pipe(
      catchError(this.handleError)
    );
  }



  public deleteTermlanguage(termlanguageid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || ''),
      body: {
        termlanguageid: termlanguageid
      }
    };

    return this.httpClient.delete<any>(API_URL + '/termlanguages/deleteTermlanguage', httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  public deleteTerm(termid: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || ''),
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
