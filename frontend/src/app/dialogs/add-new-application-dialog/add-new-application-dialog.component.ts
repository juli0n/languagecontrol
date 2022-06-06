import { Component, OnInit } from '@angular/core';
import {AddNewApplicationDialogService} from "./add-new-application-dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslatorComponent} from "../../helper/translator/translator.component";
import {TranslatorService} from "../../helper/translator/translator.service";

@Component({
  selector: 'app-add-new-application-dialog',
  templateUrl: './add-new-application-dialog.component.html',
  styleUrls: ['./add-new-application-dialog.component.sass']
})
export class AddNewApplicationDialogComponent extends TranslatorComponent implements OnInit {

  newApplicationName = '';

  constructor(private _snackBar: MatSnackBar,
              translatorService:TranslatorService,
              public dialogRef: MatDialogRef<AddNewApplicationDialogComponent>,
              private addNewApplicationDialogService:AddNewApplicationDialogService) {
    super(translatorService);
  }

  ngOnInit(): void {
  }

  saveApplication() {
    if (this.newApplicationName != ''){
      this.addNewApplicationDialogService.addNewApplication(this.newApplicationName).subscribe(result => {
        this._snackBar.open(this.getTextByVariable(result, true), 'OK', {duration: 3000});
        this.dialogRef.close(true);
      });
    }else{
      this._snackBar.open(this.getTextByVariable('add_applicationname', true), 'OK', {duration: 3000});
    }
  }
}
