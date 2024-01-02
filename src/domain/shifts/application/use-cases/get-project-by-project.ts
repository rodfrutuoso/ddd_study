/* eslint-disable no-useless-constructor */
import { ProjectRepository } from "../repositories/project-repository";
import { Project } from "../../enterprise/entities/project";

interface GetProjectByProjectInterfaceRequest {
  projectCode: string;
  page: number;
}

interface GetProjectByProjectInterfaceResponse {
  project: Array<Project>;
}

export class GetProjectByProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    projectCode,
    page,
  }: GetProjectByProjectInterfaceRequest): Promise<GetProjectByProjectInterfaceResponse> {
    const project = await this.projectRepository.findMany(
      { page },
      projectCode
    );

    return { project };
  }
}
