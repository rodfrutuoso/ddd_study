import { PaginationParams } from "@/core/repositories/pagination-params";
import { APRReport } from "@/domain/questions/apr/enterprise/entities/aprReport";

export interface AprReportRepository {
  create(aprReport: APRReport): Promise<void>;
  findMany(
    params: PaginationParams,
    projectShiftId: string
  ): Promise<Array<APRReport>>;
}
