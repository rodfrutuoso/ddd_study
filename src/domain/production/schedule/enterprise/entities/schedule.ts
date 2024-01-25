import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ScheduleProps {
  projectId: UniqueEntityId;
  teamId: UniqueEntityId;
  date: Date;
}

export class Schedule extends Entity<ScheduleProps> {
  get projectId() {
    return this.props.projectId;
  }

  get teamId() {
    return this.props.teamId;
  }

  get date() {
    return this.props.date;
  }

  static create(props: ScheduleProps, id?: UniqueEntityId) {
    const schedule = new Schedule(
      {
        ...props,
      },
      id
    );

    return schedule;
  }
}
