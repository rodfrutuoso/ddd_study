import { randomUUID } from "crypto";

export class TeamLeader {
  public id: String;
  public name: String;

  constructor(name: String, id?: String) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
