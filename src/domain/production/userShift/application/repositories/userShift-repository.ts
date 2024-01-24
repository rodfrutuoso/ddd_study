import { PaginationParams } from "@/core/repositories/pagination-params";
import { UserShift } from "@/domain/production/userShift/enterprise/entities/userShift";

export interface UserShiftRepository {
  create(userShift: UserShift): Promise<void>;
  findMany(
    params: PaginationParams,
    shiftId: string
  ): Promise<Array<UserShift>>;
  delete(projectShifit: UserShift): Promise<void>;
}
