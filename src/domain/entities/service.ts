import { randomUUID } from "crypto";

export class Service {
  public id: String;
  public launchs: String;

  constructor(launchs: String, id?: String) {
    this.id = id ?? randomUUID();
    this.launchs = launchs;
  }
}
