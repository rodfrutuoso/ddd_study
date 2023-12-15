import { randomUUID } from "crypto";

export class Project {
  public id: String;
  public project: String;
  public description: String;
  public utd: String;

  constructor(project: String, description: String, utd: String, id?: String) {
    this.id = id ?? randomUUID();
    this.project = project;
    this.description = description;
    this.utd = utd;
  }
}
