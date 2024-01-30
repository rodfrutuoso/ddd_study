import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class UserNameId {
  private name?: string;
  private id?: UniqueEntityId;

  constructor(name: string | undefined, id: UniqueEntityId | undefined) {
    this.name = name ?? undefined;
    this.id = id ?? undefined;
  }

  getName(): string | undefined {
    return this.name;
  }

  getId(): UniqueEntityId | undefined {
    return this.id;
  }
}
