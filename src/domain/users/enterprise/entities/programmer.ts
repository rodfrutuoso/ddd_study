import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export type ProgrammerProps = UserProps;

export class Programmer extends User<ProgrammerProps> {
  static create(
    props: Optinal<ProgrammerProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const programmer = new Programmer(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return programmer;
  }
}
