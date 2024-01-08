import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../../enterprise/entities/question";

export interface APRRiskProps extends QuestionProps {
  category: string;
}

export class APRRisk extends Question<APRRiskProps> {
  get category() {
    return this.props.category;
  }

  static create(
    props: Optinal<APRRiskProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const aprRisk = new APRRisk(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return aprRisk;
  }
}
