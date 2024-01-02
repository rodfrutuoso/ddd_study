import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectRepository } from "@/domain/shifts/application/repositories/project-repository";
import { Project } from "@/domain/shifts/enterprise/entities/project";

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  async create(project: Project) {
    this.items.push(project);
  }

  async findMany(
    { page }: PaginationParams,
    projectCode?: string,
    description?: string,
    city?: string,
    utd?: string
  ): Promise<Project[]> {
    const project = this.items
      .filter(
        (project) => !projectCode || project.projectCode.includes(projectCode)
      )
      .filter((project) => !description || project.description === description)
      .filter((project) => !city || project.city === city)
      .filter((project) => !utd || project.utd === utd)
      .slice((page - 1) * 50, page * 50);

    return project;
  }

  async save(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === project.id);

    this.items[itemIndex] = project;
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = this.items.find((item) => item.id.toString() === projectId);

    if (!project) return null;

    return project;
  }
}
