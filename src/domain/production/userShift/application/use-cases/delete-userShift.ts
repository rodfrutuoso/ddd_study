/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { UserShiftRepository } from "../repositories/userShift-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteUserShiftInterfaceRequest {
  userShiftId: string;
  programmerType: string;
}

type DeleteUserShiftInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteUserShift {
  constructor(private userShiftRepository: UserShiftRepository) {}

  async execute({
    userShiftId,
    programmerType,
  }: DeleteUserShiftInterfaceRequest): Promise<DeleteUserShiftInterfaceResponse> {
    const userShift = await this.userShiftRepository.findById(userShiftId);

    if (!userShift) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.userShiftRepository.delete(userShift);

    return right({});
  }
}
