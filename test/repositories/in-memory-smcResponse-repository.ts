import { PaginationParams } from "@/core/repositories/pagination-params";
import { SmcResponseRepository } from "@/domain/questions/smc/application/repositories/smcResponse-repository";
import { SMCResponse } from "@/domain/questions/smc/enterprise/entities/smcResponse";

export class InMemorySmcResponseRepository implements SmcResponseRepository {
  public items: SMCResponse[] = [];

  async create(smcResponse: SMCResponse) {
    this.items.push(smcResponse);
  }

  async findMany(
    { page }: PaginationParams,
    shiftId: string
  ): Promise<SMCResponse[]> {
    const smcResponses = this.items
      .filter(
        (smcResponse) => !shiftId || smcResponse.shiftId.toString() === shiftId
      )
      .slice((page - 1) * 50, page * 50);

    return smcResponses;
  }

  async save(smcResponse: SMCResponse): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === smcResponse.id
    );

    this.items[itemIndex] = smcResponse;
  }

  async findById(SMCResponseId: string): Promise<SMCResponse | null> {
    const SMCResponse = this.items.find(
      (item) => item.id.toString() === SMCResponseId
    );

    if (!SMCResponse) return null;

    return SMCResponse;
  }
}
