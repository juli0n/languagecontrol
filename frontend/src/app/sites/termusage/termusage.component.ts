import {Component, OnInit} from '@angular/core';
import {Applications} from "../../datamodels/Applications";
import {TermusageService} from "./termusage.service";
import {Terms} from "../../datamodels/Terms";
import {EditTermDialogComponent} from "../../dialogs/edit-term-dialog/edit-term-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Languages} from "../../datamodels/Languages";
import {Termusages} from "../../datamodels/Termusages";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {
  AddNewApplicationDialogComponent
} from "../../dialogs/add-new-application-dialog/add-new-application-dialog.component";
import {AddTermToApplicationComponent} from "../../dialogs/add-term-to-application/add-term-to-application.component";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";


@Component({
  selector: 'app-termusage',
  templateUrl: './termusage.component.html',
  styleUrls: ['./termusage.component.sass']
})
export class TermusageComponent extends TranslatorComponent implements OnInit {

  selectedApplication: Applications = new Applications();

  allApplications: Applications[] = [];
  allPossibleTerms: Terms[] = [];
  languages: Languages[] = [];

  usedtermFilter = '';
  filteredUsedTerms: Termusages[] = [];

  possibleTermFilter = '';
  allPossibleTermsFiltered: Terms[] = [];


  initialSkeleton = [
    'Test'
  ];
  done = [
    'A', 'B', 'C', 'D', 'E'
  ];


  constructor(private termusageService: TermusageService,
              private _snackBar: MatSnackBar,
              translatorService: TranslatorService,
              public dialog: MatDialog) {

    super(translatorService);

    this.termusageService.getAllApplications().subscribe(result => {
      this.allApplications = result;
    });

    this.termusageService.getAllLanguages().subscribe(result => {
      this.languages = result;
    });

    if (history.state.data != null) {
      this.selectedApplication = history.state.data;
      this.selectApplication(this.selectedApplication);
    }

  }

  ngOnInit(): void {
  }

  selectApplication(item: Applications) {

    this.filteredUsedTerms = item.usedterms;

    this.termusageService.getAllNotActivatedLanguages(item.uuid).subscribe(result => {
      this.allPossibleTerms = result;
      this.allPossibleTermsFiltered = result;
      if (this.allPossibleTermsFiltered.length == 0) {

        var defaultEmpty = new Terms()
        defaultEmpty.defaultterm = 'all_terms_assigned';

        this.allPossibleTerms.push(defaultEmpty);
      }

    });
    this.selectedApplication = item;
    if (this.selectedApplication.usedterms.length == 0) {

      var defaultTermusages = new Termusages();


      var defaultEmpty = new Terms();
      defaultEmpty.defaultterm = 'no_terms_assigned';

      defaultTermusages.term = defaultEmpty;

      this.selectedApplication.usedterms.push(defaultTermusages);
    }
  }

  deselectApplication() {
    this.usedtermFilter = '';
    this.possibleTermFilter = '';
    this.selectedApplication = new Applications();
  }


  filterAvailableTerms(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allPossibleTermsFiltered = this.allPossibleTerms.filter(term => term.defaultterm.toLowerCase().includes(filterValue.toLowerCase()));
  }

  filterUsedTerms() {
    this.filteredUsedTerms = this.selectedApplication.usedterms.filter(term => term.term.defaultterm.toLowerCase().includes(this.usedtermFilter.toLowerCase()));
  }

  showTermDetail(term: Terms) {
    const dialogRef = this.dialog.open(EditTermDialogComponent, {
      width: '50%',
      height: '90%',
      data: {
        term: term,
        type: 'edit',
        languages: this.languages
      }
    });
  }

  deleteTermusage(item: Termusages) {
    this.termusageService.deleteTermusage(item.uuid).subscribe(result => {
      this._snackBar.open(result, 'OK', {duration: 3000});

      this.termusageService.getAllApplications().subscribe(result => {
        this.allApplications = result;
      });

    });
  }

  drop(event: CdkDragDrop<any[]>, toActive: boolean) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {


      if (toActive) {

        var item = event.previousContainer.data[event.previousIndex];

        if (item.defaultterm != 'all_terms_assigned'){

          if (this.selectedApplication.usedterms.length == 1) {

            if (this.selectedApplication.usedterms[0].term.defaultterm == 'no_terms_assigned') {
              this.selectedApplication.usedterms = [];
            }

          }

          //in Termusages umwandeln und Dialog öffnen
          const dialogRef = this.dialog.open(AddTermToApplicationComponent, {
            width: '30%',
            data: {
              term: item,
              application: this.selectedApplication.uuid
            }
          });
          dialogRef.afterClosed().subscribe(result => {

            if (result != undefined) {

              const termusage = [{
                uuid: result[0],
                textvariable: result[1],
                applicationsID: this.selectedApplication.uuid,
                termsID: item.uuid,
                term: event.previousContainer.data[event.previousIndex]
              }];

              transferArrayItem<Termusages>(
                termusage,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
              );

              event.previousContainer.data.splice(event.previousIndex, 1);

              if (event.previousContainer.data.length == 0) {

                var defaultEmpty = new Terms()
                defaultEmpty.defaultterm = 'all_terms_assigned';

                this.allPossibleTerms.push(defaultEmpty);

              }

            }

          });

        }

      } else
      {

        var item = event.previousContainer.data[event.previousIndex];

        if (item.term.defaultterm != 'no_terms_assigned'){

          this.termusageService.deleteTermusage(item.uuid).subscribe(result => {
            this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});

            const term = [{
              uuid: item.term.uuid,
              defaultterm: item.term.defaultterm,
              languages: item.term.languages
            }];

            transferArrayItem<Terms>(
              term,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );

            if (this.selectedApplication.usedterms.length == 1) {

              this.selectedApplication.usedterms = [];

              var defaultTermusages = new Termusages();

              var defaultEmpty = new Terms();
              defaultEmpty.defaultterm = 'no_terms_assigned';

              defaultTermusages.term = defaultEmpty;

              this.selectedApplication.usedterms.push(defaultTermusages);
            }

          });

        }

      }

    }

  }

  filterUnusedterm() {
    this.allPossibleTermsFiltered = this.allPossibleTerms.filter(term => term.defaultterm.toLowerCase().includes(this.possibleTermFilter.toLowerCase()));
  }
}
