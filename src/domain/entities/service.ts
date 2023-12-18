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

  get description() {
    return this.props.description;
  }

  set code(code: string) {
    this.props.code = code;
  }

  set description(description: string) {
    this.props.description = description;
  }

  static create(props: ServiceProps, id?: UniqueEntityId) {
    const service = new Service(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    );

    return service;
  }
}
