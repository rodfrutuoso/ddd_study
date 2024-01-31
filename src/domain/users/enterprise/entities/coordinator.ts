import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export type CoordinatorProps = UserProps;

export class Coordinator extends User<CoordinatorProps> {
  static create(
    props: Optinal<CoordinatorProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const coordinator = new Coordinator(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return coordinator;
  }
}
