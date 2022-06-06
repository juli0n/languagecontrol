import {Languages} from "./Languages";

export class Applicationlanguages {
  uuid: string = "";
  applicationID: string = "";
  languageID: string = "";

  language: Languages = new Languages();



  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
