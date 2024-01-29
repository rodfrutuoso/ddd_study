/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Coordinator } from "../../enterprise/entities/coordinator";
import { CoordinatorRepository } from "../repositories/coordinator-repository";

interface EditCoordinatorInterfaceRequest {
  coordinatorId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

interface EditCoordinatorInterfaceResponse {
  coordinator: Coordinator;
}

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

    if (!coordinator) throw new Error("coordinator not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    coordinator.name = name ?? coordinator.name;
    coordinator.password = password ?? coordinator.password;
    coordinator.deactivation_date =
      deactivation_date ?? coordinator.deactivation_date;

    await this.coordinatorRepository.save(coordinator);

    return { coordinator };
  }
}
