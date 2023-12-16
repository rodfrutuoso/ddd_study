import { randomUUID } from "crypto";

interface TeamProps {
  name: String;
  leaderId: String;
  type: String;
  contract: String;
}

export class Team {
  public id: String;
  public name: String;
  public leaderId: String;
  public type: String;
  public contract: String;

  constructor(props: TeamProps, id?: String) {
    this.id = id ?? randomUUID();
    this.name = props.name;
    this.leaderId = props.leaderId;
    this.type = props.type;
    this.contract = props.contract;
  }
}
