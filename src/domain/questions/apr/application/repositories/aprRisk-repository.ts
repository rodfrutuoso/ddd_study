import { PaginationParams } from "@/core/repositories/pagination-params";
import { APRRisk } from "@/domain/questions/apr/enterprise/entities/aprRisk";

export interface AprRiskRepository {
  create(aprRisk: APRRisk): Promise<void>;
  findMany(
    params: PaginationParams,
    date?: Date,
    question?: string,
    category?: string
  ): Promise<Array<APRRisk>>;
  save(aprRisk: APRRisk): Promise<void>;
  findById(aprRiskId: string): Promise<APRRisk | null>;
}
