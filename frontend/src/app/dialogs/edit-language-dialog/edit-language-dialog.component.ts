import {Component, Inject, OnInit} from '@angular/core';
import {Languages} from "../../datamodels/Languages";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslatorService} from "../../helper/translator/translator.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {EditTermDialogService} from "../edit-term-dialog/edit-term-dialog.service";
import {EditLanguageDialogService} from "./edit-language-dialog.service";

@Component({
  selector: 'app-edit-language-dialog',
  templateUrl: './edit-language-dialog.component.html',
  styleUrls: ['./edit-language-dialog.component.sass']
})
export class EditLanguageDialogComponent extends TranslatorComponent implements OnInit {

  selectedLanguage: Languages = new Languages();
  allLanguages: Languages[] = [];
  type = '';

  constructor(private _snackBar: MatSnackBar,
              translatorService:TranslatorService,
              public dialogRef: MatDialogRef<EditLanguageDialogComponent>,
              private editLanguageDialogService: EditLanguageDialogService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(translatorService);


    this.type = data.type;
    this.selectedLanguage = data.language;
    this.allLanguages = data.allLanguages;
  }

  ngOnInit(): void {
  }

  deleteLanguage() {

    this.editLanguageDialogService.deleteLanguage(this.selectedLanguage.uuid).subscribe(result => {
      this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});
      this.dialogRef.close(true)
    });

  }

  saveLanguage() {

    var showError = false;
    var errorVariables = '';
    var errorText = 'unique_values';

    if (this.selectedLanguage.uuid == ''){

      this.allLanguages.forEach((currentLanguage, index) => {
        if(currentLanguage.language == this.selectedLanguage.language) {
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('language', true);
        }

        if (currentLanguage.isocode == this.selectedLanguage.isocode){
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('isocode', true);
        }

        if (currentLanguage.endonym == this.selectedLanguage.endonym){
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('endonym', true);
        }

      });

      var finalText = this.getTextByVariable(errorText, true) + ': ' + errorVariables;

      if (showError){
        this._snackBar.open(finalText, 'OK', {duration: 3000});
      }else {

        this.editLanguageDialogService.addNewLanguage(this.selectedLanguage).subscribe(result => this.languageAdded(result));

      }

    }else{
      this.allLanguages.forEach((currentLanguage, index) => {
        if(currentLanguage.language == this.selectedLanguage.language && currentLanguage.uuid != this.selectedLanguage.uuid) {
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('language', true);
        }

        if (currentLanguage.isocode == this.selectedLanguage.isocode && currentLanguage.uuid != this.selectedLanguage.uuid){
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('isocode', true);
        }

        if (currentLanguage.endonym == this.selectedLanguage.endonym && currentLanguage.uuid != this.selectedLanguage.uuid){
          showError = true;
          errorVariables = errorVariables + ' ' + this.getTextByVariable('endonym', true);
        }

      });

      var finalText = this.getTextByVariable(errorText, true) + ': ' + errorVariables;

      if (showError){
        this._snackBar.open(finalText, 'OK', {duration: 3000});
      }else {

        this.editLanguageDialogService.updateLanguage(this.selectedLanguage).subscribe(result => this.languageAdded(result));

      }
    }

  }

  cancel() {
    this.dialogRef.close(false);
  }

  private languageAdded(result: any) {
    this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});
    this.dialogRef.close(false);
  }
}
