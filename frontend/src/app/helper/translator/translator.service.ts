import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Languages} from "../../datamodels/Languages";

const API_URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  allLanguages: Languages[] = [];
  textVariableMap = new Map<string,string>();
  aktuelleSprache = 'de';

  constructor(private httpClient: HttpClient) {

    this.initTranslationLoading('de');

  }


  private createMapFromResult(result:any){

    this.textVariableMap.clear();

    for (var item in result[0].usedterms){

      var textVariable = result[0].usedterms[item].textvariable;
      var textTerm = result[0].usedterms[item].term.languages[0].termtext;

      this.textVariableMap.set(textVariable, textTerm);
    }
  }


  public getUebersetzungen(languageIso: string): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token',  localStorage.getItem("jwt") || '')
      .append('languageIso', languageIso)
      .append('applicationname', 'languagecontrol');
    const param = new HttpParams();

    return this.httpClient.get<any>(API_URL + '/translation/getAllApplicationTerms', {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }







  public getTextByVariable(textvariable: string, firstUppercase: boolean): string {

    if (this.textVariableMap.get(textvariable) == undefined){

      return textvariable;
    }else {

      var usedText = this.textVariableMap.get(textvariable);

      if (firstUppercase && usedText != undefined){
        usedText = usedText.toString().charAt(0).toUpperCase() + usedText.slice(1)
      }

      return usedText!.toString();
    }
  }


  public initTranslationLoading(isocode: string){

    this.getUebersetzungen(isocode).subscribe(result => this.createMapFromResult(result), error => alert('Error'));



  }




  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }
}
