import {Termusages} from "./Termusages";
import {Applicationlanguages} from "./Applicationlanguages";

export class Applications {
  uuid: string = "";
  applicationname: string = "";

  usedterms: Termusages[] = [];
  activelanguages: Applicationlanguages[] = [];




  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
