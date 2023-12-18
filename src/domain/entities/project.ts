import { Entity } from "../../core/entities/entity";

interface ProjectProps {
    project: string, 
    description?: string, 
    utd?: string,
    city?:string,
    project_group?: string,
}

export class Project extends Entity<ProjectProps> {
}
