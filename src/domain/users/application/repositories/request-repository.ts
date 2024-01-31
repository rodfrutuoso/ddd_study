import { PaginationParams } from "@/core/repositories/pagination-params";
import { Request } from "@/domain/users/enterprise/entities/request";

export interface RequestRepository {
  create(request: Request): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<Request>>;
  save(request: Request): Promise<void>;
  findById(requestId: string): Promise<Request | null>;
}
