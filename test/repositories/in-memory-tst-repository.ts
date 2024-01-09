import { PaginationParams } from "@/core/repositories/pagination-params";
import { TstRepository } from "@/domain/users/application/repositories/tst-repository";
import { Tst } from "@/domain/users/enterprise/entities/tst";

export class InMemoryTstRepository implements TstRepository {
  public items: Tst[] = [];

  async create(tst: Tst) {
    this.items.push(tst);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Tst[]> {
    const tsts = this.items
      .filter((tst) => !email || tst.email?.includes(email))
      .filter((tst) => !name || tst.name.includes(name))
      .filter((tst) => !cpf || tst.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return tsts;
  }

  async save(tst: Tst): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === tst.id);

    this.items[itemIndex] = tst;
  }

  async findById(TstId: string): Promise<Tst | null> {
    const Tst = this.items.find((item) => item.id.toString() === TstId);

    if (!Tst) return null;

    return Tst;
  }
}
