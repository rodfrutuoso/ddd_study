import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export type TstProps = UserProps;

export class Tst extends User<TstProps> {
  static create(props: Optinal<TstProps, "created_at">, id?: UniqueEntityId) {
    const tst = new Tst(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return tst;
  }
}
