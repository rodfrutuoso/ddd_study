// TODO
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "./question";

export type SMCQuestionProps = QuestionProps;

export class SMCQuestion extends Question<SMCQuestionProps> {
  static create(
    props: Optinal<SMCQuestionProps, "startDate">,
    id?: UniqueEntityId,
  ) {
    const shift = new SMCQuestion(
      {
        ...props,
        startDate: new Date(),
      },
      id,
    );

    return shift;
  }
}
