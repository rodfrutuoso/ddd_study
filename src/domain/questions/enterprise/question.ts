/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface QuestionProps {
  question: string;
  startDate: Date;
  endDate?: Date;
}

export class Question extends Entity<QuestionProps> {
  get question() {
    return this.props.question;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  static create(
    props: Optinal<QuestionProps, "startDate">,
    id?: UniqueEntityId,
  ) {
    const shift = new Question(
      {
        ...props,
        startDate: new Date(),
      },
      id,
    );

    return shift;
  }
}
