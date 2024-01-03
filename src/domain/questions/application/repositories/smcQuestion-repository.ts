import { PaginationParams } from "@/core/repositories/pagination-params";
import { SMCQuestion } from "@/domain/questions/enterprise/entities/smcQuestion";

export interface SmcQuestionRepository {
  create(smcQuestion: SMCQuestion): Promise<void>;
  findMany(
    params: PaginationParams,
    smcquestionCode?: string,
    description?: string,
    city?: string,
    utd?: string
  ): Promise<Array<SMCQuestion>>;
  save(smcQuestion: SMCQuestion): Promise<void>;
  findById(smcQuestionId: string): Promise<SMCQuestion | null>;
}
