import {Component, Inject, OnInit} from '@angular/core';
import {Terms} from "../../datamodels/Terms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddNewApplicationDialogService} from "../add-new-application-dialog/add-new-application-dialog.service";
import {AddTermToApplicationService} from "./add-term-to-application.service";
import {Termusages} from "../../datamodels/Termusages";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";

@Component({
  selector: 'app-add-term-to-application',
  templateUrl: './add-term-to-application.component.html',
  styleUrls: ['./add-term-to-application.component.sass']
})
export class AddTermToApplicationComponent extends TranslatorComponent implements OnInit {

  termVariable = '';
  currentApplication = '';
  selectedTerm: Terms = new Terms();


  constructor(private _snackBar: MatSnackBar,
              translatorService:TranslatorService,
              public dialogRef: MatDialogRef<AddTermToApplicationComponent>,
              private addTermToApplicationService:AddTermToApplicationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(translatorService);

    this.selectedTerm = data.term;
    this.currentApplication = data.application;
  }

  ngOnInit(): void {
  }

  saveApplicationTerm() {
    if (this.termVariable != ''){

      var newTermusage = new Termusages();
      newTermusage.textvariable = this.termVariable;
      newTermusage.applicationsID = this.currentApplication;
      newTermusage.termsID = this.selectedTerm.uuid;

      this.addTermToApplicationService.addNewTermusage(newTermusage).subscribe(result => {
        this.dialogRef.close([result, this.termVariable]);
      });

    }
  }
}
