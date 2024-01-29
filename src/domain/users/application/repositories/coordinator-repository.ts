import { PaginationParams } from "@/core/repositories/pagination-params";
import { Coordinator } from "@/domain/users/enterprise/entities/coordinator";

export interface CoordinatorRepository {
  create(coordinator: Coordinator): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Coordinator>>;
  save(coordinator: Coordinator): Promise<void>;
  findById(coordinatorId: string): Promise<Coordinator | null>;
}
