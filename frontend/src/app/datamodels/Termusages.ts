import {Terms} from "./Terms";

export class Termusages {
  uuid: string = "";
  textvariable: string = "";
  termsID: string = "";
  applicationsID: string = "";

  term: Terms = new Terms();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
