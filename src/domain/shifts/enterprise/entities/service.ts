import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ServiceProps {
  code: string;
  description: string;
}

export class Service extends Entity<ServiceProps> {
  get code() {
    return this.props.code;
  }

  set code(code: string) {
    this.props.code = code;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  static create(props: ServiceProps, id?: UniqueEntityId) {
    const service = new Service(
      {
        ...props,
      },
      id
    );

    return service;
  }
}
