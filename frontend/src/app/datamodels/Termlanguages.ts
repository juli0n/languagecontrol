import {Languages} from "./Languages";

export class Termlanguages {
  uuid: string = "";
  termtext: string = "";
  languageID: string = "";

  language : Languages = new Languages();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
