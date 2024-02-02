/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteProjectShiftInterfaceRequest {
  projectShiftId: string;
  programmerType: string;
}

type DeleteProjectShiftInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteProjectShift {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    projectShiftId,
    programmerType,
  }: DeleteProjectShiftInterfaceRequest): Promise<DeleteProjectShiftInterfaceResponse> {
    const projectShift =
      await this.projectShiftRepository.findById(projectShiftId);

    if (!projectShift) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.projectShiftRepository.delete(projectShift);

    return right({});
  }
}
