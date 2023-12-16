import { randomUUID } from "crypto";

interface ShiftProps {
  teamId: String;
  date: Date;
}

export class Shift {
  public id: String;
  public teamId: String;
  public date: Date;

  constructor(props: ShiftProps, id?: String) {
    this.id = id ?? randomUUID();
    this.teamId = props.teamId;
    this.date = props.date;
  }
}
