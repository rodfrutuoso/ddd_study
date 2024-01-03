/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ResponseProps {
  questionId: UniqueEntityId;
}

export abstract class Response<
  Props extends ResponseProps,
> extends Entity<Props> {
  get questionId() {
    return this.props.questionId;
  }
}
