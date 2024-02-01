/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { LaunchRepository } from "../repositories/launch-repository";
import { Value } from "../../enterprise/entities/value-objects/value";
import { Launch } from "../../enterprise/entities/launch";
import { Either, left, right } from "@/core/either";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface EditLaunchInterfaceRequest {
  launchId: string;
  programmerType: string;
  value: number;
}

type EditLaunchInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { launch: Launch }
>;

export class EditLaunch {
  constructor(private launchRepository: LaunchRepository) {}

  async execute({
    launchId,
    programmerType,
    value,
  }: EditLaunchInterfaceRequest): Promise<EditLaunchInterfaceResponse> {
    const launch = await this.launchRepository.findById(launchId);

    if (!launch) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    launch.value = new Value(value) ?? launch.value;

    await this.launchRepository.save(launch);

    return right({ launch });
  }
}
