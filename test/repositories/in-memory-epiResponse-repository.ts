import { PaginationParams } from "@/core/repositories/pagination-params";
import { EpiResponseRepository } from "@/domain/questions/epi/application/repositories/epiResponse-repository";
import { EPIResponse } from "@/domain/questions/epi/enterprise/entities/epiResponse";

export class InMemoryEpiResponseRepository implements EpiResponseRepository {
  public items: EPIResponse[] = [];

  async create(epiResponse: EPIResponse) {
    this.items.push(epiResponse);
  }

  async findMany(
    { page }: PaginationParams,
    shiftId: string
  ): Promise<EPIResponse[]> {
    const epiResponses = this.items
      .filter(
        (epiResponse) => !shiftId || epiResponse.shiftId.toString() === shiftId
      )
      .slice((page - 1) * 50, page * 50);

    return epiResponses;
  }

  async save(epiResponse: EPIResponse): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === epiResponse.id
    );

    this.items[itemIndex] = epiResponse;
  }

  async findById(EPIResponseId: string): Promise<EPIResponse | null> {
    const EPIResponse = this.items.find(
      (item) => item.id.toString() === EPIResponseId
    );

    if (!EPIResponse) return null;

    return EPIResponse;
  }
}
