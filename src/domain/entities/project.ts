import { Entity } from "../../core/entities/entity";

interface ProjectProps {
    project: string, 
    description: string, 
    utd: string
}

export class Project extends Entity<ProjectProps> {
}
