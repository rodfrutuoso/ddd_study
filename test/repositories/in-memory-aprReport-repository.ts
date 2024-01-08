import { PaginationParams } from "@/core/repositories/pagination-params";
import { AprReportRepository } from "@/domain/questions/apr/application/repositories/aprReport-repository";
import { APRReport } from "@/domain/questions/apr/enterprise/entities/aprReport";

export class InMemoryAprReportRepository implements AprReportRepository {
  public items: APRReport[] = [];

  async create(aprReport: APRReport) {
    this.items.push(aprReport);
  }

  async findMany(
    { page }: PaginationParams,
    projectShiftId: string
  ): Promise<APRReport[]> {
    const aprReports = this.items
      .filter(
        (aprReport) =>
          !projectShiftId ||
          aprReport.projectShiftId.toString() === projectShiftId
      )
      .slice((page - 1) * 50, page * 50);

    return aprReports;
  }
}
