import { randomUUID } from "crypto";

interface TeamLeaderProps{
    name:String
}

export class TeamLeader {
  public id: String;
  public name: String;

  constructor(props: TeamLeaderProps, id?: String) {
    this.name = props.name;
    this.id = id ?? randomUUID();
  }
}
