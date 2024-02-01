/* eslint-disable no-useless-constructor */
import { ProjectRepository } from "../repositories/project-repository";
import { Project } from "../../enterprise/entities/project";
import { Either, right } from "@/core/either";

interface GetProjectByProjectInterfaceRequest {
  projectCode: string;
  page: number;
}

type GetProjectByProjectInterfaceResponse = Either<
  null,
  { project: Array<Project> }
>;

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

    return right({ project });
  }
}
