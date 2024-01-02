import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ProjectShiftProps {
  shiftId: UniqueEntityId;
  projectId: UniqueEntityId;
  projectStage: string;
  fieldReturn: string;
  outOfSchedule: boolean;
}

export class ProjectShift extends Entity<ProjectShiftProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get projectId() {
    return this.props.projectId;
  }

  get projectStage() {
    return this.props.projectStage;
  }

  set projectStage(projectStage: string) {
    this.props.projectStage = projectStage;
  }

  get fieldReturn() {
    return this.props.fieldReturn;
  }

  set fieldReturn(fieldReturn: string) {
    this.props.fieldReturn = fieldReturn;
  }

  get outOfSchedule() {
    return this.props.outOfSchedule;
  }

  set outOfSchedule(outOfSchedule: boolean) {
    this.props.outOfSchedule = outOfSchedule;
  }

  static create(props: ProjectShiftProps, id?: UniqueEntityId) {
    const projectShift = new ProjectShift(
      {
        ...props,
      },
      id
    );

    return projectShift;
  }
}
