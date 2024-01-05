import { PaginationParams } from "@/core/repositories/pagination-params";
import { AprMeasureRepository } from "@/domain/questions/application/repositories/aprMeasure-repository";
import { APRMeasure } from "@/domain/questions/enterprise/entities/aprMeasure";

export class InMemoryAprMeasureRepository implements AprMeasureRepository {
  public items: APRMeasure[] = [];

  async create(aprMeasure: APRMeasure) {
    this.items.push(aprMeasure);
  }

  async findMany(
    { page }: PaginationParams,
    date?: Date,
    response?: string,
    category?: string
  ): Promise<APRMeasure[]> {
    const aprMeasures = this.items
      .filter(
        (aprMeasure) => !response || aprMeasure.response.includes(response)
      )
      .filter(
        (aprMeasure) => !category || aprMeasure.category.includes(category)
      )
      .filter(
        (aprMeasure) =>
          !date ||
          (aprMeasure.startDate <= date &&
            (!aprMeasure.endDate || aprMeasure.endDate >= date))
      )
      .slice((page - 1) * 50, page * 50);

    return aprMeasures;
  }

  async save(aprMeasure: APRMeasure): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === aprMeasure.id);

    this.items[itemIndex] = aprMeasure;
  }

  async findById(AprMeasureId: string): Promise<APRMeasure | null> {
    const APRMeasure = this.items.find(
      (item) => item.id.toString() === AprMeasureId
    );

    if (!APRMeasure) return null;

    return APRMeasure;
  }
}
