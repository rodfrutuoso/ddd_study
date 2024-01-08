import { PaginationParams } from "@/core/repositories/pagination-params";
import { AprRiskRepository } from "@/domain/questions/apr/application/repositories/aprRisk-repository";
import { APRRisk } from "@/domain/questions/apr/enterprise/entities/aprRisk";

export class InMemoryAprRiskRepository implements AprRiskRepository {
  public items: APRRisk[] = [];

  async create(aprRisk: APRRisk) {
    this.items.push(aprRisk);
  }

  async findMany(
    { page }: PaginationParams,
    date?: Date,
    question?: string,
    category?: string
  ): Promise<APRRisk[]> {
    const aprRisks = this.items
      .filter((aprRisk) => !question || aprRisk.question.includes(question))
      .filter((aprRisk) => !category || aprRisk.category.includes(category))
      .filter(
        (aprRisk) =>
          !date ||
          (aprRisk.startDate <= date &&
            (!aprRisk.endDate || aprRisk.endDate >= date))
      )
      .slice((page - 1) * 50, page * 50);

    return aprRisks;
  }

  async save(aprRisk: APRRisk): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === aprRisk.id);

    this.items[itemIndex] = aprRisk;
  }

  async findById(AprRiskId: string): Promise<APRRisk | null> {
    const APRRisk = this.items.find((item) => item.id.toString() === AprRiskId);

    if (!APRRisk) return null;

    return APRRisk;
  }
}
