/* eslint-disable no-useless-constructor */
import { UserShiftRepository } from "../repositories/userShift-repository";

interface DeleteUserShiftInterfaceRequest {
  userShiftId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteUserShiftInterfaceResponse {}

export class DeleteUserShift {
  constructor(private userShiftRepository: UserShiftRepository) {}

  async execute({
    userShiftId,
    programmerType,
  }: DeleteUserShiftInterfaceRequest): Promise<DeleteUserShiftInterfaceResponse> {
    const userShift = await this.userShiftRepository.findById(userShiftId);

    if (!userShift) throw new Error("UserShift not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.userShiftRepository.delete(userShift);

    return {};
  }
}
