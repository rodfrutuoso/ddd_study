import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ProjectProps {
  project: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

export class Project extends Entity<ProjectProps> {
  get project() {
    return this.props.project;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get utd(): string | undefined {
    return this.props.utd;
  }

  set utd(utd: string) {
    this.props.utd = utd;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get group(): string | undefined {
    return this.props.group;
  }

  set group(group: string) {
    this.props.group = group;
  }

  static create(props: ProjectProps, id?: UniqueEntityId) {
    const project = new Project(
      {
        ...props,
      },
      id
    );

    return project;
  }
}
