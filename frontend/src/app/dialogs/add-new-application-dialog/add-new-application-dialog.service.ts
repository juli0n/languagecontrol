import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Terms} from "../../datamodels/Terms";
import {catchError, Observable} from "rxjs";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AddNewApplicationDialogService {

  constructor(private httpClient: HttpClient) { }



  public addNewApplication(applicationname: string): Observable<any> {
    const headers = new HttpHeaders();

    const head = {
      headers: headers
    };

    const body = {
      applicationname: applicationname
    };

    return this.httpClient.post(API_URL + '/applications/addNewApplication', body, head).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }
}
