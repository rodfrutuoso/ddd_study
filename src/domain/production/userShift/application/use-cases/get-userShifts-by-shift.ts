/* eslint-disable no-useless-constructor */
import { UserShiftRepository } from "../repositories/userShift-repository";
import { UserShift } from "../../enterprise/entities/userShift";
import { Either, right } from "@/core/either";

interface GetUserShiftByShiftInterfaceRequest {
  shiftId: string;
  page: number;
}

type GetUserShiftByShiftInterfaceResponse = Either<
  null,
  { userShifts: Array<UserShift> }
>;

export class GetUserShiftByShift {
  constructor(private userShiftRepository: UserShiftRepository) {}

  async execute({
    shiftId,
    page,
  }: GetUserShiftByShiftInterfaceRequest): Promise<GetUserShiftByShiftInterfaceResponse> {
    const userShifts = await this.userShiftRepository.findMany(
      { page },
      shiftId
    );

    return right({ userShifts });
  }
}
