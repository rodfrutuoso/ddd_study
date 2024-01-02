/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { ProjectShift } from "../../enterprise/entities/projectShift";
import { ProjectShiftRepository } from "../repositories/projectShift-repository";

interface RegisterProjectShiftInterfaceRequest {
  shiftId: string;
  projectId: string;
  projectStage: string;
  fieldReturn: string;
  outOfSchedule: boolean;
}

interface RegisterProjectShiftInterfaceResponse {
  projectShift: ProjectShift;
}

export class RegisterProjectShift {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    shiftId,
    projectId,
    projectStage,
    fieldReturn,
    outOfSchedule,
  }: RegisterProjectShiftInterfaceRequest): Promise<RegisterProjectShiftInterfaceResponse> {
    const projectShift = ProjectShift.create({
      shiftId: new UniqueEntityId(shiftId),
      projectId: new UniqueEntityId(projectId),
      projectStage,
      fieldReturn,
      outOfSchedule,
    });

    await this.projectShiftRepository.create(projectShift);

    return { projectShift };
  }
}
