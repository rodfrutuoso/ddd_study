import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class userNameId {
  private name: string;
  private id: UniqueEntityId;

  constructor(name: string, id: UniqueEntityId) {
    this.name = name;
    this.id = id;
  }

  get Name() {
    return this.name;
  }

  get Id() {
    return this.id;
  }
}
