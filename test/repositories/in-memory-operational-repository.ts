import { PaginationParams } from "@/core/repositories/pagination-params";
import { OperationalRepository } from "@/domain/users/application/repositories/operational-repository";
import { Operational } from "@/domain/users/enterprise/entities/operational";

export class InMemoryOperationalRepository implements OperationalRepository {
  public items: Operational[] = [];

  async create(operational: Operational) {
    this.items.push(operational);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Operational[]> {
    const operationals = this.items
      .filter((operational) => !email || operational.email?.includes(email))
      .filter((operational) => !name || operational.name.includes(name))
      .filter((operational) => !cpf || operational.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return operationals;
  }

  async save(operational: Operational): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === operational.id
    );

    this.items[itemIndex] = operational;
  }

  async findById(OperationalId: string): Promise<Operational | null> {
    const Operational = this.items.find(
      (item) => item.id.toString() === OperationalId
    );

    if (!Operational) return null;

    return Operational;
  }
}
