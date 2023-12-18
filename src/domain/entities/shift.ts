import { Entity } from "../../core/entities/entity";

interface ShiftProps {
  teamId: string;
  date: Date;
}

export class Shift extends Entity<ShiftProps> {
  get teamId(){
    return this.props.teamId
  }

  get date(){
    return this.props.date
  }

}
