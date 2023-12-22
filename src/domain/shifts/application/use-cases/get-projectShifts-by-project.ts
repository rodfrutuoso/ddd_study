/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShifit";

interface GetProjectShiftByProjectInterfaceRequest {
  projectId: string;
  page: number;
}

interface GetProjectShiftByProjectInterfaceResponse {
  projectShifts: Array<ProjectShift>;
}

export class GetProjectShiftByProject {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    projectId,
    page,
  }: GetProjectShiftByProjectInterfaceRequest): Promise<GetProjectShiftByProjectInterfaceResponse> {
    const projectShifts = await this.projectShiftRepository.findManyByProject(
      projectId,
      { page },
    );

    return { projectShifts };
  }
}
