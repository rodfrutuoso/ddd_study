import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../../enterprise/entities/question";

export type EPIQuestionProps = QuestionProps;

export class EPIQuestion extends Question<EPIQuestionProps> {
  static create(
    props: Optinal<EPIQuestionProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const epiQuestion = new EPIQuestion(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return epiQuestion;
  }
}
