import { Component, OnInit } from '@angular/core';
import {TranslatorService} from "./translator.service";

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.sass']
})
export class TranslatorComponent{

  constructor(private translatorService: TranslatorService) { }

  getTextByVariable(textvariable:string, firstUppercase: boolean): string{
    return this.translatorService.getTextByVariable(textvariable,firstUppercase);
  }


  changeLanguage(isocode:string){
    return this.translatorService.initTranslationLoading(isocode);
  }

}
