import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface ServiceProps {
  code: string;
  description: string;
}

export class Service extends Entity<ServiceProps> {
  static create(props: ServiceProps, id?: UniqueEntityId) {
    const service = new Service(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return service;
  }
}
