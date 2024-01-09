import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProgrammerRepository } from "@/domain/users/application/repositories/programmer-repository";
import { Programmer } from "@/domain/users/enterprise/entities/programmer";

export class InMemoryProgrammerRepository implements ProgrammerRepository {
  public items: Programmer[] = [];

  async create(programmer: Programmer) {
    this.items.push(programmer);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Programmer[]> {
    const programmers = this.items
      .filter((programmer) => !email || programmer.email?.includes(email))
      .filter((programmer) => !name || programmer.name.includes(name))
      .filter((programmer) => !cpf || programmer.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return programmers;
  }

  async save(programmer: Programmer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === programmer.id);

    this.items[itemIndex] = programmer;
  }

  async findById(ProgrammerId: string): Promise<Programmer | null> {
    const Programmer = this.items.find(
      (item) => item.id.toString() === ProgrammerId
    );

    if (!Programmer) return null;

    return Programmer;
  }
}
