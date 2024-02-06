/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { Coordinator } from "../../enterprise/entities/coordinator";
import { CoordinatorRepository } from "../repositories/coordinator-repository";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface EditCoordinatorInterfaceRequest {
  coordinatorId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

type EditCoordinatorInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { coordinator: Coordinator }
>;

export class EditCoordinator {
  constructor(private coordinatorRepository: CoordinatorRepository) {}

  async execute({
    coordinatorId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditCoordinatorInterfaceRequest): Promise<EditCoordinatorInterfaceResponse> {
    const coordinator =
      await this.coordinatorRepository.findById(coordinatorId);

    if (!coordinator) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    coordinator.name = name ?? coordinator.name;
    coordinator.password = password ?? coordinator.password;
    coordinator.deactivation_date =
      deactivation_date ?? coordinator.deactivation_date;

    await this.coordinatorRepository.save(coordinator);

    return right({ coordinator });
  }
}
