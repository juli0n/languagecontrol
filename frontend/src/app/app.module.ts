import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApplicationsComponent} from './sites/applications/applications.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './sites/dashboard/dashboard.component';
import {TermsComponent} from './sites/terms/terms.component';
import {TermusageComponent} from './sites/termusage/termusage.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {EditTermDialogComponent} from './dialogs/edit-term-dialog/edit-term-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {
  AddNewApplicationDialogComponent
} from './dialogs/add-new-application-dialog/add-new-application-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { AddTermToApplicationComponent } from './dialogs/add-term-to-application/add-term-to-application.component';
import { TranslatorComponent } from './helper/translator/translator.component';
import { LanguagesComponent } from './sites/languages/languages.component';
import {MatTableModule} from "@angular/material/table";
import { EditLanguageDialogComponent } from './dialogs/edit-language-dialog/edit-language-dialog.component';


const routes: Routes = [
  {path: 'applications', component: ApplicationsComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'termusages', component: TermusageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'languages', component: LanguagesComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    DashboardComponent,
    TermsComponent,
    TermusageComponent,
    EditTermDialogComponent,
    AddNewApplicationDialogComponent,
    AddTermToApplicationComponent,
    TranslatorComponent,
    LanguagesComponent,
    EditLanguageDialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule.forRoot(
      routes
    ),
    MatMenuModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCardModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
