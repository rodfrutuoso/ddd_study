/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, right } from "@/core/either";
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Launch } from "../../enterprise/entities/launch";
import { Value } from "../../enterprise/entities/value-objects/value";
import { LaunchRepository } from "../repositories/launch-repository";

interface LaunchServiceInterfaceRequest {
  projectShiftId: string;
  value: number;
  serviceId: string;
}

type LaunchServiceInterfaceResponse = Either<null, { launch: Launch }>;

export class LaunchService {
  constructor(private launchRepository: LaunchRepository) {}

  async execute({
    projectShiftId,
    value,
    serviceId,
  }: LaunchServiceInterfaceRequest): Promise<LaunchServiceInterfaceResponse> {
    const launch = Launch.create({
      value: Value.verifyNumberIsNotNegative(value),
      serviceId: new UniqueEntityId(serviceId),
      projectShiftId: new UniqueEntityId(projectShiftId),
    });

    await this.launchRepository.create(launch);

    return right({ launch });
  }
}
