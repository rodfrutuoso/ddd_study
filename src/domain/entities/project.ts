import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface ProjectProps {
    project: string, 
    description?: string, 
    utd?: string,
    city?:string,
    project_group?: string,
}

export class Project extends Entity<ProjectProps> {

  static create(props: ProjectProps, id?: UniqueEntityId) {
    const project = new Project(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return project;
  }
}
