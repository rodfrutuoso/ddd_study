import { PaginationParams } from "@/core/repositories/pagination-params";
import { SmcQuestionRepository } from "@/domain/questions/smc/application/repositories/smcQuestion-repository";
import { SMCQuestion } from "@/domain/questions/smc/enterprise/entities/smcQuestion";

export class InMemorySmcQuestionRepository implements SmcQuestionRepository {
  public items: SMCQuestion[] = [];

  async create(smcQuestion: SMCQuestion) {
    this.items.push(smcQuestion);
  }

  async findMany(
    { page }: PaginationParams,
    date?: Date,
    question?: string
  ): Promise<SMCQuestion[]> {
    const smcQuestions = this.items
      .filter(
        (smcQuestion) => !question || smcQuestion.question.includes(question)
      )
      .filter(
        (smcQuestion) =>
          !date ||
          (smcQuestion.startDate <= date &&
            (!smcQuestion.endDate || smcQuestion.endDate >= date))
      )
      .slice((page - 1) * 50, page * 50);

    return smcQuestions;
  }

  async save(smcQuestion: SMCQuestion): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === smcQuestion.id
    );

    this.items[itemIndex] = smcQuestion;
  }

  async findById(SMCQuestionId: string): Promise<SMCQuestion | null> {
    const SMCQuestion = this.items.find(
      (item) => item.id.toString() === SMCQuestionId
    );

    if (!SMCQuestion) return null;

    return SMCQuestion;
  }
}
