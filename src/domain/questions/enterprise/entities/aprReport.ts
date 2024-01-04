import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "./question";

export interface APRReportProps extends QuestionProps {
  projectShiftId: UniqueEntityId;
  risksId: Array<UniqueEntityId>;
  measuresId: Array<UniqueEntityId>;
  activity: string;
}

export class APRReport extends Question<APRReportProps> {
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

  static create(
    props: Optinal<APRReportProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const aprReport = new APRReport(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return aprReport;
  }
}
