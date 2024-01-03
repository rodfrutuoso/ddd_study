import { PaginationParams } from "@/core/repositories/pagination-params";
import { SmcQuestionRepository } from "@/domain/questions/application/repositories/smcQuestion-repository";
import { SMCQuestion } from "@/domain/questions/enterprise/entities/smcQuestion";

export class InMemorySmcQuestionRepository implements SmcQuestionRepository {
  public items: SMCQuestion[] = [];

  async create(smcQuestion: SMCQuestion) {
    this.items.push(smcQuestion);
  }

  async findMany(
    { page }: PaginationParams,
    question: string
  ): Promise<SMCQuestion[]> {
    const smcQuestions = this.items
      .filter((smcQuestion) => smcQuestion.question.includes(question))
      .slice((page - 1) * 50, page * 50);

    return smcQuestions;
  }

  async save(SMCQuestion: SMCQuestion): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === SMCQuestion.id
    );

    this.items[itemIndex] = SMCQuestion;
  }

  async findById(SMCQuestionId: string): Promise<SMCQuestion | null> {
    const SMCQuestion = this.items.find(
      (item) => item.id.toString() === SMCQuestionId
    );

    if (!SMCQuestion) return null;

    return SMCQuestion;
  }
}
