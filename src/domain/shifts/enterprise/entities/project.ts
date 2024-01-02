import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ProjectProps {
  projectCode: string;
  description?: string;
  utd?: string;
  city?: string;
  group?: string;
}

export class Project extends Entity<ProjectProps> {
  get projectCode() {
    return this.props.projectCode;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(description: string | undefined) {
    this.props.description = description;
  }

  get utd(): string | undefined {
    return this.props.utd;
  }

  set utd(utd: string | undefined) {
    this.props.utd = utd;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  set city(city: string | undefined) {
    this.props.city = city;
  }

  get group(): string | undefined {
    return this.props.group;
  }

  set group(group: string | undefined) {
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
