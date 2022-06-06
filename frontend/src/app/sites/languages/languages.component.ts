import { Component, OnInit } from '@angular/core';
import {ApplicationsService} from "../applications/applications.service";
import {LanguagesService} from "./languages.service";
import {Languages} from "../../datamodels/Languages";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";
import {MatTableDataSource} from "@angular/material/table";
import {EditTermDialogComponent} from "../../dialogs/edit-term-dialog/edit-term-dialog.component";
import {Terms} from "../../datamodels/Terms";
import {EditLanguageDialogComponent} from "../../dialogs/edit-language-dialog/edit-language-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.sass']
})
export class LanguagesComponent extends TranslatorComponent implements OnInit {

  languages: Languages[] = [];
  languagesDataSource = new MatTableDataSource();
  displayedLanguagesColumns: string[] = ['favourite', 'language', 'isocode','endonym', ' '];



  searchTerm = '';


  constructor(private languagesService: LanguagesService,
              public dialog: MatDialog,
              translatorService: TranslatorService) {

    super(translatorService);


    this.languagesService.getAllLanguages().subscribe(result => {
      this.languages = result;
      this.languagesDataSource = new MatTableDataSource<any>(this.languages);
    });

  }

  ngOnInit(): void {
  }

  filterTerms(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.languagesDataSource.filter = filterValue.trim().toLowerCase();
  }

  changeFavouriteState(row: any) {

    if (row.favourite == 'X'){
      row.favourite = '';
    }else{
      row.favourite = 'X'
    }

    this.languagesService.changeLanguage(row).subscribe(result => {

    });


    this.languagesService.getAllLanguages().subscribe(result => {
      this.languages = result;
      this.languagesDataSource = new MatTableDataSource<any>(this.languages);
    });



  }

  editLanguage(row: any) {
    const dialogRef = this.dialog.open(EditLanguageDialogComponent, {
      data: {
        language: row,
        type: 'edit',
        allLanguages: this.languages
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.languagesService.getAllLanguages().subscribe(result => {
          this.languages = result;
          this.languagesDataSource = new MatTableDataSource<any>(this.languages);
        });
    });
  }

  deleteLanguage(row: any) {
    const dialogRef = this.dialog.open(EditLanguageDialogComponent, {
      data: {
        language: row,
        type: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.languagesService.getAllLanguages().subscribe(result => {
          this.languages = result;
          this.languagesDataSource = new MatTableDataSource<any>(this.languages);
        });
      }
    });
  }

  newLanguage() {
    const dialogRef = this.dialog.open(EditLanguageDialogComponent, {
      data: {
        language: new Languages(),
        type: 'new',
        allLanguages: this.languages
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.languagesService.getAllLanguages().subscribe(result => {
          this.languages = result;
          this.languagesDataSource = new MatTableDataSource<any>(this.languages);
        });
      }
    });
  }
}
