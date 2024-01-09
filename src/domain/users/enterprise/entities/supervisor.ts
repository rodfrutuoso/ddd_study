import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export type SupervisorProps = UserProps;

export class Supervisor extends User<SupervisorProps> {
  static create(
    props: Optinal<SupervisorProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const supervisor = new Supervisor(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return supervisor;
  }
}
