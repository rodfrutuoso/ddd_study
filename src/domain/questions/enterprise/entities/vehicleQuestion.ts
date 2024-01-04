import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "./question";

export type VehicleQuestionProps = QuestionProps;

export class VehicleQuestion extends Question<VehicleQuestionProps> {
  static create(
    props: Optinal<VehicleQuestionProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const vehicleQuestion = new VehicleQuestion(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return vehicleQuestion;
  }
}
