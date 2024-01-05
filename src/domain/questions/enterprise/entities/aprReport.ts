import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";

export interface APRReportProps {
  projectShiftId: UniqueEntityId;
  risksId: Array<UniqueEntityId>;
  measuresId: Array<UniqueEntityId>;
  activity: string;
}

export class APRReport extends Entity<APRReportProps> {
  get projectShiftId() {
    return this.props.projectShiftId;
  }

  get risksId() {
    return this.props.risksId;
  }

  get measuresId() {
    return this.props.measuresId;
  }

  get activity() {
    return this.props.activity;
  }

  static create(props: APRReportProps, id?: UniqueEntityId) {
    const aprReport = new APRReport(
      {
        ...props,
      },
      id
    );

    return aprReport;
  }
}
