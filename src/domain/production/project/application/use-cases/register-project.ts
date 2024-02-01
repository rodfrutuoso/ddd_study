/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, right } from "@/core/either";
import { Project } from "../../enterprise/entities/project";
import { ProjectRepository } from "../repositories/project-repository";

interface RegisterProjectInterfaceRequest {
  projectCode: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

type RegisterProjectInterfaceResponse = Either<null, { project: Project }>;

export class RegisterProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    projectCode,
    description,
    utd,
    city,
    group,
  }: RegisterProjectInterfaceRequest): Promise<RegisterProjectInterfaceResponse> {
    const project = Project.create({
      projectCode,
      description,
      utd,
      city,
      group,
    });

    await this.projectRepository.create(project);

    return right({ project });
  }
}
