/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShift";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditProjectShiftInterfaceRequest {
  projectShiftId: string;
  projectStage?: string;
  fieldReturn?: string;
  outOfSchedule?: boolean;
  programmerType: string;
}

type EditProjectShiftInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { projectshift: ProjectShift }
>;

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

    if (!projectshift) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    projectshift.projectStage = projectStage ?? projectshift.projectStage;
    projectshift.fieldReturn = fieldReturn ?? projectshift.fieldReturn;
    projectshift.outOfSchedule = outOfSchedule ?? projectshift.outOfSchedule;

    await this.projectshiftRepository.save(projectshift);

    return right({ projectshift });
  }
}
