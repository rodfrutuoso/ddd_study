import { randomUUID } from "crypto";

interface ServiceProps{
    description: String
}

export class Service {
  public id: String;
  public description: String;

  constructor(props:ServiceProps, id?: String) {
    this.id = id ?? randomUUID();
    this.description = props.description;
  }
}
