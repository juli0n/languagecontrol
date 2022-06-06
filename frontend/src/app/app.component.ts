import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Themes} from "./datamodels/Themes";
import {Router} from "@angular/router";
import {ThemesService} from "./helper/themes/themes.service";
import {TranslatorComponent} from "./helper/translator/translator.component";
import {TranslatorService} from "./helper/translator/translator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent extends TranslatorComponent implements OnInit{
  title = 'frontend';

  themeOptions : Themes[] = [];
  languageOptions : [] = [];

  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemesService,
              translatorService: TranslatorService,
              private router: Router) {

    super(translatorService);

    this.themeService.getThemeOptions().subscribe(result => this.themeOptions = result);
    this.themeService.getAllLanguages().subscribe(result => {
      this.languageOptions = result[0].activelanguages;
      var das = 2345;
    });
  }

  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");

  }

  changeTheme(themeToSet:any) {
    this.themeService.setTheme(themeToSet);
  }

  changeSelectedLanguage(isocode: string) {
    this.changeLanguage(isocode);
  }

  routeToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
