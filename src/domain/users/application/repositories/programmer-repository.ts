import { PaginationParams } from "@/core/repositories/pagination-params";
import { Programmer } from "@/domain/users/enterprise/entities/programmer";

export interface ProgrammerRepository {
  create(programmer: Programmer): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Programmer>>;
  save(programmer: Programmer): Promise<void>;
  findById(programmerId: string): Promise<Programmer | null>;
}
