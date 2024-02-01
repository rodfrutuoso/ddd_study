/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ProjectRepository } from "../repositories/project-repository";
import { Project } from "../../enterprise/entities/project";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditProjectInterfaceRequest {
  projectId: string;
  programmerType: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

type EditProjectInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { project: Project }
>;

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

    if (!project) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    project.description = description ?? project.description;
    project.utd = utd ?? project.utd;
    project.city = city ?? project.city;
    project.group = group ?? project.group;

    await this.projectRepository.save(project);

    return right({ project });
  }
}
