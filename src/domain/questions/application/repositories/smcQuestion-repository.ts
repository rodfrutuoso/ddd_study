import { PaginationParams } from "@/core/repositories/pagination-params";
import { SMCQuestion } from "@/domain/questions/enterprise/entities/smcQuestion";

export interface SmcQuestionRepository {
  create(smcquestion: SMCQuestion): Promise<void>;
  findMany(
    params: PaginationParams,
    smcquestionCode?: string,
    description?: string,
    city?: string,
    utd?: string
  ): Promise<Array<SMCQuestion>>;
  save(smcquestion: SMCQuestion): Promise<void>;
  findById(smcquestionId: string): Promise<SMCQuestion | null>;
}
