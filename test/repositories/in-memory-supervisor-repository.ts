import { PaginationParams } from "@/core/repositories/pagination-params";
import { SupervisorRepository } from "@/domain/users/application/repositories/supervisor-repository";
import { Supervisor } from "@/domain/users/enterprise/entities/supervisor";

export class InMemorySupervisorRepository implements SupervisorRepository {
  public items: Supervisor[] = [];

  async create(supervisor: Supervisor) {
    this.items.push(supervisor);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Supervisor[]> {
    const supervisors = this.items
      .filter((supervisor) => !email || supervisor.email?.includes(email))
      .filter((supervisor) => !name || supervisor.name.includes(name))
      .filter((supervisor) => !cpf || supervisor.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return supervisors;
  }

  async save(supervisor: Supervisor): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === supervisor.id);

    this.items[itemIndex] = supervisor;
  }

  async findById(SupervisorId: string): Promise<Supervisor | null> {
    const Supervisor = this.items.find(
      (item) => item.id.toString() === SupervisorId
    );

    if (!Supervisor) return null;

    return Supervisor;
  }
}
