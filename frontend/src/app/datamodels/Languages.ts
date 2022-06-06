export class Languages {
  uuid: string = "";
  language: string = "";
  endonym: string = "";
  isocode: string = "";
  favourite: string = "";

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
