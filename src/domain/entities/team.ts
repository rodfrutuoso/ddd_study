import { randomUUID } from "crypto";

export class Team {
  public id: String;
  public name: String;
  public leader: String;
  public type: String;
  public contract: String;

  constructor(
    name: String,
    leader: String,
    type: String,
    contract: String,
    id?: String
  ) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.leader = leader;
    this.type = type;
    this.contract = contract;
  }
}
