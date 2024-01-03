/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";

export interface QuestionProps {
  question: string;
  startDate: Date;
  endDate?: Date;
}

export abstract class Question<
  Props extends QuestionProps,
> extends Entity<Props> {
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
}
