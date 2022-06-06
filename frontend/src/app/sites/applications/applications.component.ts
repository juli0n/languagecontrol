import { Component, OnInit } from '@angular/core';
import {Applications} from "../../datamodels/Applications";
import {ApplicationsService} from "./applications.service";
import {Router} from "@angular/router";
import {EditTermDialogComponent} from "../../dialogs/edit-term-dialog/edit-term-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AddNewApplicationDialogComponent
} from "../../dialogs/add-new-application-dialog/add-new-application-dialog.component";
import {Languages} from "../../datamodels/Languages";
import {Applicationlanguages} from "../../datamodels/Applicationlanguages";
import {transferArrayItem} from "@angular/cdk/drag-drop";
import {Termusages} from "../../datamodels/Termusages";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.sass']
})
export class ApplicationsComponent extends TranslatorComponent implements OnInit {

  allApplications: Applications[] = [];
  languages: Languages[] = [];

  panelOpenState = true;


  selectedApplication: Applications = new Applications();

  constructor(private applicationsService: ApplicationsService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              translatorService: TranslatorService,
              private router: Router) {

    super(translatorService);


    this.applicationsService.getAllApplications().subscribe(result => {
      this.allApplications = result;
    });

    this.applicationsService.getAllLanguages().subscribe(result => {
      this.languages = result;
    });
  }

  ngOnInit(): void {
  }

  selectApplication(item: any) {
    this.selectedApplication = item;
  }

  addNewApplication() {
    const dialogRef = this.dialog.open(AddNewApplicationDialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.applicationsService.getAllApplications().subscribe(result => {
          this.allApplications = result;
        });
      }

    });
  }

  editTermusage() {
    this.router.navigateByUrl('termusages', {state: {data: this.selectedApplication}});

  }

  checkActiveLanguage(uuid: string) {
    var active = false;

    for (var i = 0; i < this.selectedApplication.activelanguages.length; i++){
      if (this.selectedApplication.activelanguages[i].languageID == uuid){
        active = true;
        return active;
        break;
      }
    }

    return active;
  }

  toggleLanguage(uuid: string) {
    var active = false;

    for (var i = 0; i < this.selectedApplication.activelanguages.length; i++){
      if (this.selectedApplication.activelanguages[i].languageID == uuid){
        active = true;
        break;
      }
    }

    if (active){
      this.applicationsService.removeActiveLanguage(this.selectedApplication.uuid, uuid).subscribe(result => {
        this.selectedApplication.activelanguages.forEach((value,index)=>{
          if(value.languageID==uuid) this.selectedApplication.activelanguages.splice(index,1);
        });
      });


    } else {
      var newActiveLanguage = new Applicationlanguages();
      newActiveLanguage.applicationID = this.selectedApplication.uuid;
      newActiveLanguage.languageID = uuid;
      this.applicationsService.addActiveLanguage(newActiveLanguage).subscribe(result => {
        this.selectedApplication.activelanguages.push(newActiveLanguage);
      });

    }

    return true;

  }

  deleteApplication() {
    this.applicationsService.deleteApplication(this.selectedApplication.uuid).subscribe(result => {
      this.applicationsService.getAllApplications().subscribe(result => {
        this.allApplications = result;
      });
      this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});
      this.selectedApplication = new Applications();
    });
  }
}
