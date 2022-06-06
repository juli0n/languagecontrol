import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Themes} from "../../datamodels/Themes";
import {StyleManagerService} from "./style-manager.service";
import {environment} from "../../../environments/environment";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ThemesService {


  constructor(private http: HttpClient,
              private styleManager: StyleManagerService) {
  }


  getThemeOptions(): Observable<Array<Themes>> {
    return this.http.get<Array<Themes>>("assets/themes.json");
  }

  getLanguageOptions(): Observable<any> {
    return this.http.get<any>("assets/languages.json");
  }

  public getAllLanguages(): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '')
      .append('applicationname', 'languagecontrol');
    const param = new HttpParams();

    return this.http.get<any>(API_URL + '/translation/getAllLanguages', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }

  setTheme(themeToSet:any) {
    this.styleManager.setStyle(
      "theme",
      `/assets/themes/${themeToSet}.css`
    );
  }
}
