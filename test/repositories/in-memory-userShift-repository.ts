import { PaginationParams } from "@/core/repositories/pagination-params";
import { UserShiftRepository } from "@/domain/production/userShift/application/repositories/userShift-repository";
import { UserShift } from "@/domain/production/userShift/enterprise/entities/userShift";

export class InMemoryUserShiftRepository implements UserShiftRepository {
  public items: UserShift[] = [];
  async findMany(
    { page }: PaginationParams,
    shiftId: string
  ): Promise<UserShift[]> {
    const usershifts = this.items
      .filter(
        (usershift) => !shiftId || usershift.shiftId.toString() === shiftId
      )
      .slice((page - 1) * 50, page * 50);

    return usershifts;
  }

  async create(userShift: UserShift) {
    this.items.push(userShift);
  }

  async delete(projectShifit: UserShift) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === projectShifit.id
    );

    this.items.splice(itemIndex, 1);
  }
}
