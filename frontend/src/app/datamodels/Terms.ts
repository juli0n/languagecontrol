import {Termlanguages} from "./Termlanguages";

export class Terms {
  uuid: string = "";
  defaultterm: string = "";

  languages: Termlanguages[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
