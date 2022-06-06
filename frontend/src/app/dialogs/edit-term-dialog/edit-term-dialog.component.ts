import {Component, Inject, OnInit} from '@angular/core';
import {Terms} from "../../datamodels/Terms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Languages} from "../../datamodels/Languages";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Termlanguages} from "../../datamodels/Termlanguages";
import {EditTermDialogService} from "./edit-term-dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";

@Component({
  selector: 'app-edit-term-dialog',
  templateUrl: './edit-term-dialog.component.html',
  styleUrls: ['./edit-term-dialog.component.sass']
})
export class EditTermDialogComponent extends TranslatorComponent implements OnInit {

  selectedTerm: Terms = new Terms();
  type = '';
  languages: Languages[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<Languages[]>;

  constructor(private _snackBar: MatSnackBar,
              translatorService:TranslatorService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditTermDialogComponent>,
              private editTermDialogService: EditTermDialogService) {

    super(translatorService);

    this.type = data.type;
    this.selectedTerm = data.term;
    this.languages = data.languages;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  ngOnInit(): void {
  }


  private _filter(value: string): Languages[] {
    const filterValue = value.toLowerCase();

    return this.languages.filter(option => option.language.toLowerCase().includes(filterValue));
  }

  addNewLanguage() {
    var newTermlanguage = new Termlanguages();
    this.selectedTerm.languages.push(newTermlanguage);


    //this._filter('');
  }

  deleteTerm() {

    this.editTermDialogService.deleteTerm(this.selectedTerm.uuid).subscribe(result => this.uploadFinished(result));

  }

  saveTerm() {

    if (this.type == 'new') {

      if (this.selectedTerm.defaultterm != '') {

        var allowSave = true;


        this.selectedTerm.languages.forEach((value, index) => {
          if (value.termtext == '' || value.languageID == '') {
            this._snackBar.open(this.getTextByVariable('all_fields_must_be_filled', false), 'OK', {duration: 3000});
            allowSave = false;
            return;
          }
        });


        this.selectedTerm.languages.forEach((value, index) => {

          const count = this.selectedTerm.languages.reduce((acc, cur) => cur.languageID === value.languageID ? ++acc : acc, 0);

          if (count > 1) {
            this._snackBar.open(this.getTextByVariable('only_one_language', false), 'OK', {duration: 3000});
            allowSave = false;
            return;
          }
        });
        if (allowSave){
          this.editTermDialogService.addNewTerm(this.selectedTerm).subscribe(result => this.uploadFinished(result));
        }

      } else {
        this._snackBar.open(this.getTextByVariable('defaultterm_needed', false), 'OK', {duration: 3000});
      }

    } else if (this.type == 'edit') {

      if (this.selectedTerm.defaultterm != '') {

        var allowSave = true;

        this.selectedTerm.languages.forEach((value, index) => {
          if (value.termtext == '' || value.languageID == '') {
            this._snackBar.open(this.getTextByVariable('all_fields_must_be_filled', false), 'OK', {duration: 3000});
            allowSave = false;
            return;
          }
        });

        this.selectedTerm.languages.forEach((value, index) => {

          const count = this.selectedTerm.languages.reduce((acc, cur) => cur.languageID === value.languageID ? ++acc : acc, 0);

          if (count > 1) {
            this._snackBar.open(this.getTextByVariable('only_one_language', false), 'OK', {duration: 3000});
            allowSave = false;
            return;
          }
        });

        if (allowSave) {
          this.editTermDialogService.updateTerm(this.selectedTerm).subscribe(result => this.uploadFinished(result));
        }

      } else {
        this._snackBar.open(this.getTextByVariable('defaultterm_needed', false), 'OK', {duration: 3000});
      }

    }

  }

  uploadFinished(result: any) {
    this._snackBar.open(this.getTextByVariable(result, false), 'OK', {duration: 3000});
    this.dialogRef.close(true);
  }

  displayFn(value: any): string {
    //var themo = value ? this.languages.find(_ => _.isocode === value)!.language : '';
    return value ? this.languages.find(_ => _.isocode === value)!.language : '';
    //return value ? value.language : '';
  }

  deleteTermlanguage(lang: Termlanguages) {

    if (lang.uuid != '') {
      //Delete from DB
      this.editTermDialogService.deleteTermlanguage(lang.uuid).subscribe(result => {

        this.selectedTerm.languages.forEach((value, index) => {
          if (value.uuid == lang.uuid) {
            this.selectedTerm.languages.splice(index, 1);
          }
        });

        this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});


      });

    } else {

      this.selectedTerm.languages.forEach((value, index) => {
        if (value.uuid == lang.uuid) {
          this.selectedTerm.languages.splice(index, 1);
        }
      });

    }

  }
}
