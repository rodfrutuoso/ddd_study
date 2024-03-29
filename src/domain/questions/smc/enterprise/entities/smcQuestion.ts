// TODO
import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../../enterprise/entities/question";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SMCQuestionProps extends QuestionProps {}

export class SMCQuestion extends Question<SMCQuestionProps> {
  static create(
    props: Optinal<SMCQuestionProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const smcQuestion = new SMCQuestion(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return smcQuestion;
  }
}
