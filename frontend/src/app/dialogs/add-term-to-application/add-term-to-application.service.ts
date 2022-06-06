import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Termusages} from "../../datamodels/Termusages";

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AddTermToApplicationService {

  constructor(private httpClient: HttpClient) { }


  public addNewTermusage(newActiveTerm: Termusages): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '');

    const head = {
      headers: headers
    };

    const body = {
      newTermusage: JSON.stringify(newActiveTerm)
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
