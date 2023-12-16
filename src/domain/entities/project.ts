import { randomUUID } from "crypto";

interface ProjectProps {
    project: String, 
    description: String, 
    utd: String
}

export class Project {
  public id: String;
  public project: String;
  public description: String;
  public utd: String;

  constructor(props:ProjectProps, id?: String) {
    this.id = id ?? randomUUID();
    this.project = props.project;
    this.description = props.description;
    this.utd = props.utd;
  }
}
