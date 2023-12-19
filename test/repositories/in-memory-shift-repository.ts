import { ShitRepository } from "@/domain/shifts/application/repositories/shift-repository";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export class InMemoryShitRepository implements ShitRepository {
  public items: Shift[] = [];

  async create(shift: Shift) {
    this.items.push(shift);
  }
}
