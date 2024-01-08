import { PaginationParams } from "@/core/repositories/pagination-params";
import { SMCResponse } from "@/domain/questions/smc/enterprise/entities/smcResponse";

export interface SmcResponseRepository {
  create(smcResponse: SMCResponse): Promise<void>;
  findMany(
    params: PaginationParams,
    shiftId: string
  ): Promise<Array<SMCResponse>>;
  save(smcResponse: SMCResponse): Promise<void>;
  findById(smcResponseId: string): Promise<SMCResponse | null>;
}
