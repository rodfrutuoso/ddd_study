/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, left, right } from "@/core/either";
import { ShiftRepository } from "../repositories/shift-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteShiftInterfaceRequest {
  shiftId: string;
  programmerType: string;
}

type DeleteShiftInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteShift {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    shiftId,
    programmerType,
  }: DeleteShiftInterfaceRequest): Promise<DeleteShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shiftId);

    if (!shift) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.shiftRepository.delete(shift);

    return right({});
  }
}
