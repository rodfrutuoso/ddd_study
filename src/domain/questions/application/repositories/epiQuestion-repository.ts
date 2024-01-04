import { PaginationParams } from "@/core/repositories/pagination-params";
import { EPIQuestion } from "@/domain/questions/enterprise/entities/epiQuestion";

export interface EpiQuestionRepository {
  create(epiQuestion: EPIQuestion): Promise<void>;
  findMany(
    params: PaginationParams,
    date?: Date,
    question?: string
  ): Promise<Array<EPIQuestion>>;
  save(epiQuestion: EPIQuestion): Promise<void>;
  findById(epiQuestionId: string): Promise<EPIQuestion | null>;
}
