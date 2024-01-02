/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Project } from "../../enterprise/entities/project";
import { ProjectRepository } from "../repositories/project-repository";

interface RegisterProjectInterfaceRequest {
  project: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

interface RegisterProjectInterfaceResponse {
  newProject: Project;
}

export class RegisterProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    project,
    description,
    utd,
    city,
    group,
  }: RegisterProjectInterfaceRequest): Promise<RegisterProjectInterfaceResponse> {
    const newProject = Project.create({
      project,
      description,
      utd,
      city,
      group,
    });

    await this.projectRepository.create(newProject);

    return { newProject };
  }
}
