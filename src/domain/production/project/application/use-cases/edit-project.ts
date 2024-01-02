/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ProjectRepository } from "../repositories/project-repository";
import { Project } from "../../enterprise/entities/project";

interface EditProjectInterfaceRequest {
  projectId: string;
  programmerType: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

interface EditProjectInterfaceResponse {
  project: Project;
}

export class EditProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    projectId,
    programmerType,
    description,
    utd,
    city,
    group,
  }: EditProjectInterfaceRequest): Promise<EditProjectInterfaceResponse> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) throw new Error("Project not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    project.description = description ?? project.description;
    project.utd = utd ?? project.utd;
    project.city = city ?? project.city;
    project.group = group ?? project.group;

    await this.projectRepository.save(project);

    return { project };
  }
}
