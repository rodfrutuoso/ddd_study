import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";

export interface APRMeasureProps {
  response: string;
  category: string;
}

export class APRMeasure extends Entity<APRMeasureProps> {
  get response() {
    return this.props.response;
  }

  get category() {
    return this.props.category;
  }

  static create(props: APRMeasureProps, id?: UniqueEntityId) {
    const aprMeasure = new APRMeasure(
      {
        ...props,
      },
      id
    );

    return aprMeasure;
  }
}
