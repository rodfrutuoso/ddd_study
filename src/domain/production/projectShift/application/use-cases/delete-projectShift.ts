/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";

interface DeleteProjectShiftInterfaceRequest {
  projectShiftId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteProjectShiftInterfaceResponse {}

export class DeleteProjectShift {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    projectShiftId,
    programmerType,
  }: DeleteProjectShiftInterfaceRequest): Promise<DeleteProjectShiftInterfaceResponse> {
    const projectShift =
      await this.projectShiftRepository.findById(projectShiftId);

    if (!projectShift) throw new Error("ProjectShift not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.projectShiftRepository.delete(projectShift);

    return {};
  }
}
