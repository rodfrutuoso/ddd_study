import { PaginationParams } from "@/core/repositories/pagination-params";
import { EpiQuestionRepository } from "@/domain/questions/application/repositories/epiQuestion-repository";
import { EPIQuestion } from "@/domain/questions/enterprise/entities/epiQuestion";

export class InMemoryEpiQuestionRepository implements EpiQuestionRepository {
  public items: EPIQuestion[] = [];

  async create(epiQuestion: EPIQuestion) {
    this.items.push(epiQuestion);
  }

  async findMany(
    { page }: PaginationParams,
    date?: Date,
    question?: string
  ): Promise<EPIQuestion[]> {
    const epiQuestions = this.items
      .filter(
        (epiQuestion) => !question || epiQuestion.question.includes(question)
      )
      .filter(
        (epiQuestion) =>
          !date ||
          (epiQuestion.startDate <= date &&
            (!epiQuestion.endDate || epiQuestion.endDate >= date))
      )
      .slice((page - 1) * 50, page * 50);

    return epiQuestions;
  }

  async save(epiQuestion: EPIQuestion): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === epiQuestion.id
    );

    this.items[itemIndex] = epiQuestion;
  }

  async findById(EPIQuestionId: string): Promise<EPIQuestion | null> {
    const EPIQuestion = this.items.find(
      (item) => item.id.toString() === EPIQuestionId
    );

    if (!EPIQuestion) return null;

    return EPIQuestion;
  }
}
