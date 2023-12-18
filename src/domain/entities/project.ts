import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface ProjectProps {
  project: string;
  description?: string;
  utd?: string;
  city?: string;
  project_group?: string;
}

export class Project extends Entity<ProjectProps> {
  get project() {
    return this.props.project;
  }

  get description() {
    return this.props.description;
  }

  get utd() {
    return this.props.utd;
  }

  get city() {
    return this.props.city;
  }

  get project_group() {
    return this.props.project_group;
  }

  set description(description:string) {
    this.props.description = description
  }

  set utd(utd:string) {
     this.props.utd = utd
  }

  set city(city: string) {
    this.props.city = city
  }

  set project_group(project_group:string) {
    this.props.project_group = project_group
  }

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
