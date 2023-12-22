/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShifit";

interface GetProjectShiftByShiftInterfaceRequest {
  shiftId: string;
  page: number;
}

interface GetProjectShiftByShiftInterfaceResponse {
  projectShifts: Array<ProjectShift>;
}

export class GetProjectShiftByShift {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    shiftId,
    page,
  }: GetProjectShiftByShiftInterfaceRequest): Promise<GetProjectShiftByShiftInterfaceResponse> {
    const projectShifts = await this.projectShiftRepository.findManyByShift(
      shiftId,
      { page },
    );

    return { projectShifts };
  }
}
