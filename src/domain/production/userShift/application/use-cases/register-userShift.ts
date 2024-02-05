/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, right } from "@/core/either";
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { UserShift } from "../../enterprise/entities/userShift";
import { UserShiftRepository } from "../repositories/userShift-repository";

interface RegisterUserShiftInterfaceRequest {
  userId: string;
  shiftId: string;
}

type RegisterUserShiftInterfaceResponse = Either<
  null,
  { userShift: UserShift }
>;

export class RegisterUserShift {
  constructor(private userShiftRepository: UserShiftRepository) {}

  async execute({
    userId,
    shiftId,
  }: RegisterUserShiftInterfaceRequest): Promise<RegisterUserShiftInterfaceResponse> {
    const userShift = UserShift.create({
      userId: new UniqueEntityId(userId),
      shiftId: new UniqueEntityId(shiftId),
    });

    await this.userShiftRepository.create(userShift);

    return right({ userShift });
  }
}
