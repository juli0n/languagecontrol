import { Component, OnInit } from '@angular/core';
import {TermsService} from "./terms.service";
import {Terms} from "../../datamodels/Terms";
import {MatDialog} from "@angular/material/dialog";
import {EditTermDialogComponent} from "../../dialogs/edit-term-dialog/edit-term-dialog.component";
import {Languages} from "../../datamodels/Languages";
import {Applications} from "../../datamodels/Applications";
import {Router} from "@angular/router";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass']
})
export class TermsComponent extends TranslatorComponent implements OnInit {

  panelOpenState = false;
  allTerms : Terms[] = [];
  filteredTerms: Terms[] = [];

  languages: Languages[] = [];

  searchTerm = '';

  selectedTerm: Terms = new Terms();
  allApplications: Applications[] = [];

  constructor(private termsService: TermsService,
              private router: Router,
              translatorService: TranslatorService,
              public dialog: MatDialog) {

    super(translatorService);

    this.termsService.getAllTerms().subscribe(result => this.allTermsLoaded(result));
    this.termsService.getAllLanguages().subscribe(result => this.allLanguagesLoaded(result));

  }

  ngOnInit(): void {
  }


  allTermsLoaded(terms:any){
    this.allTerms = terms;
    this.filteredTerms = terms;
    this.selectedTerm = new Terms();
  }

  allLanguagesLoaded(languages:any){
    this.languages = languages;
  }

  selectTerm(item: Terms) {
    this.selectedTerm = item;
    this.termsService.getAllApplicationsForTerm(item.uuid).subscribe(result => this.allApplications = result);

  }

  filterTerms() {
    this.filteredTerms = this.allTerms.filter(term => term.defaultterm.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  editTerm() {
    const dialogRef = this.dialog.open(EditTermDialogComponent, {
      width: '50%',
      height: '90%',
      data: {
        term: this.selectedTerm,
        type: 'edit',
        languages: this.languages
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.termsService.getAllTerms().subscribe(result => this.allTermsLoaded(result));
      }

    });

  }

  newTerm() {

    const dialogRef = this.dialog.open(EditTermDialogComponent, {
      width: '50%',
      height: '90%',
      data: {
        term: new Terms(),
        type: 'new',
        languages: this.languages
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.termsService.getAllTerms().subscribe(result => this.allTermsLoaded(result));
      }
    });

  }

  deleteTerm() {
    this.termsService.deleteTerm(this.selectedTerm.uuid).subscribe(result => {
      this.searchTerm = '';
      this.filterTerms();
      this.termsService.getAllTerms().subscribe(result => this.allTermsLoaded(result));

    });

  }

  openApplication(applications: Applications) {

    this.router.navigateByUrl('termusages', {state: {data: applications}});


  }
}
