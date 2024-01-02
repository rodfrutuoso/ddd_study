import { ProjectRepository } from "@/domain/shifts/application/repositories/project-repository";
import { Project } from "@/domain/shifts/enterprise/entities/project";

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  async create(project: Project) {
    this.items.push(project);
  }
}
