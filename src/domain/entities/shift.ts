import { randomUUID } from "crypto";

export class Shift {
  public id: String;
  public teamId: String;
  public date: Date;

  constructor(teamId: String, date: Date, id?: String) {
    this.id = id ?? randomUUID();
    this.teamId = teamId;
    this.date = date;
  }
}
