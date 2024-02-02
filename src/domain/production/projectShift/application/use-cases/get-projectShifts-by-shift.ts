/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShift";
import { Either, right } from "@/core/either";

interface GetProjectShiftByShiftInterfaceRequest {
  shiftId: string;
  page: number;
}

type GetProjectShiftByShiftInterfaceResponse = Either<
  null,
  { projectShifts: Array<ProjectShift> }
>;

export class GetProjectShiftByShift {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    shiftId,
    page,
  }: GetProjectShiftByShiftInterfaceRequest): Promise<GetProjectShiftByShiftInterfaceResponse> {
    const projectShifts = await this.projectShiftRepository.findMany(
      { page },
      undefined,
      shiftId
    );

    return right({ projectShifts });
  }
}
