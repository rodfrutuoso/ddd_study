import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "./question";

export type EPIQuestionProps = QuestionProps;

export class EPIQuestion extends Question<EPIQuestionProps> {
  static create(
    props: Optinal<EPIQuestionProps, "startDate">,
    id?: UniqueEntityId,
  ) {
    const shift = new EPIQuestion(
      {
        ...props,
        startDate: new Date(),
      },
      id,
    );

    return shift;
  }
}
