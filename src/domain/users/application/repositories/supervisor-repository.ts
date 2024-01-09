import { PaginationParams } from "@/core/repositories/pagination-params";
import { Supervisor } from "@/domain/users/enterprise/entities/supervisor";

export interface SupervisorRepository {
  create(supervisor: Supervisor): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Supervisor>>;
  save(supervisor: Supervisor): Promise<void>;
  findById(supervisorId: string): Promise<Supervisor | null>;
}
