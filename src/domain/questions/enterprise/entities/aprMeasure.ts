import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";

export interface APRMeasureProps {
  response: string;
  category: string;
  startDate: Date;
  endDate?: Date;
}

export class APRMeasure extends Entity<APRMeasureProps> {
  get response() {
    return this.props.response;
  }

  get category() {
    return this.props.category;
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
    props: Optinal<APRMeasureProps, "startDate">,
    id?: UniqueEntityId
  ) {
    const aprMeasure = new APRMeasure(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id
    );

    return aprMeasure;
  }
}
