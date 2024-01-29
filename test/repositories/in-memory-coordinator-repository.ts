import { PaginationParams } from "@/core/repositories/pagination-params";
import { CoordinatorRepository } from "@/domain/users/application/repositories/coordinator-repository";
import { Coordinator } from "@/domain/users/enterprise/entities/coordinator";

export class InMemoryCoordinatorRepository implements CoordinatorRepository {
  public items: Coordinator[] = [];

  async create(coordinator: Coordinator) {
    this.items.push(coordinator);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Coordinator[]> {
    const coordinators = this.items
      .filter((coordinator) => !email || coordinator.email?.includes(email))
      .filter((coordinator) => !name || coordinator.name.includes(name))
      .filter((coordinator) => !cpf || coordinator.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return coordinators;
  }

  async save(coordinator: Coordinator): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === coordinator.id
    );

    this.items[itemIndex] = coordinator;
  }

  async findById(CoordinatorId: string): Promise<Coordinator | null> {
    const Coordinator = this.items.find(
      (item) => item.id.toString() === CoordinatorId
    );

    if (!Coordinator) return null;

    return Coordinator;
  }
}
