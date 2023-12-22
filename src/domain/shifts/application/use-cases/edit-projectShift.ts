/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShifit";

interface EditProjectShiftInterfaceRequest {
  projectShiftId: string;
  projectStage: string;
  fieldReturn: string;
  outOfSchedule: boolean;
  programmerType: string;
}

interface EditProjectShiftInterfaceResponse {
  projectshift: ProjectShift;
}

export class EditProjectShift {
  constructor(private projectshiftRepository: ProjectShiftRepository) {}

  async execute({
    projectShiftId,
    projectStage,
    fieldReturn,
    outOfSchedule,
    programmerType,
  }: EditProjectShiftInterfaceRequest): Promise<EditProjectShiftInterfaceResponse> {
    const projectshift =
      await this.projectshiftRepository.findById(projectShiftId);

    if (!projectshift) throw new Error("ProjectShift not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    projectshift.projectStage = projectStage ?? projectshift.projectStage;
    projectshift.fieldReturn = fieldReturn ?? projectshift.fieldReturn;
    projectshift.outOfSchedule = outOfSchedule ?? projectshift.outOfSchedule;

    await this.projectshiftRepository.save(projectshift);

    return { projectshift };
  }
}
