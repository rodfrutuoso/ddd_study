import { PaginationParams } from "@/core/repositories/pagination-params";
import { APRMeasure } from "@/domain/questions/enterprise/entities/aprMeasure";

export interface AprMeasureRepository {
  create(aprMeasure: APRMeasure): Promise<void>;
  findMany(
    params: PaginationParams,
    date?: Date,
    response?: string,
    category?: string
  ): Promise<Array<APRMeasure>>;
  save(aprMeasure: APRMeasure): Promise<void>;
  findById(aprMeasureId: string): Promise<APRMeasure | null>;
}
