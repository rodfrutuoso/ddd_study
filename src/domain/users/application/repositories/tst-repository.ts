import { PaginationParams } from "@/core/repositories/pagination-params";
import { Tst } from "@/domain/users/enterprise/entities/tst";

export interface TstRepository {
  create(tst: Tst): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Tst>>;
  save(tst: Tst): Promise<void>;
  findById(tstId: string): Promise<Tst | null>;
}
