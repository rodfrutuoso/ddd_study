/* eslint-disable no-useless-constructor */
import { Launch } from "../../enterprise/entities/launch";
import { Project } from "../../../project/enterprise/entities/project";
import { ProjectShift } from "../../../projectShift/enterprise/entities/projectShift";
import { LaunchRepository } from "../repositories/launch-repository";
import { ProjectRepository } from "../../../project/application/repositories/project-repository";
import { ProjectShiftRepository } from "../../../projectShift/application/repositories/projectShift-repository";
import { Either, right } from "@/core/either";

interface GetLaunchByContractInterfaceRequest {
  page: number;
  projectCode: string;
}

type GetLaunchByContractInterfaceResponse = Either<
  null,
  { launchs: Array<Launch> }
>;

export class GetLaunchByProject {
  constructor(
    private launchRepository: LaunchRepository,
    private projectRepository: ProjectRepository,
    private projectShiftRepository: ProjectShiftRepository
  ) {}

  async execute({
    page,
    projectCode,
  }: GetLaunchByContractInterfaceRequest): Promise<GetLaunchByContractInterfaceResponse> {
    const projects: Project[] = [];
    let count = 1;

    while (true) {
      const projectsSearch = await this.projectRepository.findMany(
        { page: count },
        projectCode
      );

      projectsSearch.map((project) => projects.push(project));
      count++;

      if (projectsSearch.length === 0) break;
    }

    const projectsId = projects.map((project) => project.id.toString());

    const projectShifts: ProjectShift[] = [];
    count = 1;

    await Promise.all(
      projectsId.map(async (projectId) => {
        while (true) {
          const projectShiftsSearch =
            await this.projectShiftRepository.findMany(
              { page: count },
              projectId
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

    return right({ launchs });
  }
}
