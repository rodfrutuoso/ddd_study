/* eslint-disable no-useless-constructor */
import { LaunchRepository } from "../repositories/launch-repository";
import { Launch } from "../../enterprise/entities/launch";
import { ShiftRepository } from "../../../shift/application/repositories/shift-repository";
import { Shift } from "../../../shift/enterprise/entities/shift";
import { ProjectShiftRepository } from "@/domain/production/projectShift/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/production/projectShift/enterprise/entities/projectShift";

interface GetLaunchByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
}

interface GetLaunchByDateInterfaceResponse {
  launchs: Array<Launch>;
}

export class GetLaunchByDate {
  constructor(
    private launchRepository: LaunchRepository,
    private shiftRepository: ShiftRepository,
    private projectShiftRepository: ProjectShiftRepository
  ) {}

  async execute({
    startDate,
    endDate,
    page,
  }: GetLaunchByDateInterfaceRequest): Promise<GetLaunchByDateInterfaceResponse> {
    const shifts: Shift[] = [];
    let count = 1;

    while (true) {
      const shiftsSearch = await this.shiftRepository.findManyBetweenDates(
        startDate,
        endDate,
        { page: count }
      );

      shiftsSearch.map((launch) => shifts.push(launch));
      count++;

      if (shiftsSearch.length === 0) break;
    }

    const shiftsId = shifts.map((shift) => shift.id.toString());

    const projectShifts: ProjectShift[] = [];
    count = 1;

    await Promise.all(
      shiftsId.map(async (shiftId) => {
        while (true) {
          const projectShiftsSearch =
            await this.projectShiftRepository.findMany(
              { page: count },
              shiftId
            );

          projectShiftsSearch.map((projectShift) =>
            projectShifts.push(projectShift)
          );
          count++;

          if (projectShiftsSearch.length === 0) break;
        }
      })
    );

    const projectShiftsId = projectShifts.map((projectShift) =>
      projectShift.id.toString()
    );

    const launchs = await this.launchRepository.findMany(
      { page },
      undefined,
      projectShiftsId
    );

    return { launchs };
  }
}
