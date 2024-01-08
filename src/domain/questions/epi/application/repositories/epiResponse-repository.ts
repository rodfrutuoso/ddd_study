import { PaginationParams } from "@/core/repositories/pagination-params";
import { EPIResponse } from "@/domain/questions/epi/enterprise/entities/epiResponse";

export interface EpiResponseRepository {
  create(epiResponse: EPIResponse): Promise<void>;
  findMany(
    params: PaginationParams,
    shiftId: string
  ): Promise<Array<EPIResponse>>;
  save(epiResponse: EPIResponse): Promise<void>;
  findById(epiResponseId: string): Promise<EPIResponse | null>;
}
