/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShift";
import { ShiftRepository } from "../repositories/shift-repository";
import { Shift } from "../../enterprise/entities/shift";

interface GetProjectShiftByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
}

interface GetProjectShiftByDateInterfaceResponse {
  projectShifts: Array<ProjectShift>;
}

export class GetProjectShiftByDate {
  constructor(
    private projectShiftRepository: ProjectShiftRepository,
    private shiftRepository: ShiftRepository
  ) {}

  async execute({
    startDate,
    endDate,
    page,
  }: GetProjectShiftByDateInterfaceRequest): Promise<GetProjectShiftByDateInterfaceResponse> {
    const shifts: Shift[] = [];
    let count = 1;

    while (true) {
      const shiftsSearch = await this.shiftRepository.findManyBetweenDates(
        startDate,
        endDate,
        { page: count }
      );

      shiftsSearch.map((projectShift) => shifts.push(projectShift));
      count++;

      if (shiftsSearch.length === 0) break;
    }

    const shiftsId = shifts.map((shift) => shift.id.toString());

    const projectShifts = await this.projectShiftRepository.findMany(
      { page },
      undefined,
      undefined,
      shiftsId
    );

    return { projectShifts };
  }
}
