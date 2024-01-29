import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class UserNameId {
  private name: string | undefined;
  private id: UniqueEntityId | undefined;

  constructor(name: string, id: UniqueEntityId) {
    this.name = name ?? undefined;
    this.id = id ?? undefined;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }
}
