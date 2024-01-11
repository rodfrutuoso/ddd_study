import { PaginationParams } from "@/core/repositories/pagination-params";
import { Operational } from "@/domain/users/enterprise/entities/operational";

export interface OperationalRepository {
  create(operational: Operational): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Operational>>;
  save(operational: Operational): Promise<void>;
  findById(operationalId: string): Promise<Operational | null>;
}
