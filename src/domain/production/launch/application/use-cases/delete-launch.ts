/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, left, right } from "@/core/either";
import { LaunchRepository } from "../repositories/launch-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteLaunchInterfaceRequest {
  launchId: string;
  programmerType: string;
}

type DeleteLaunchInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteLaunch {
  constructor(private launchRepository: LaunchRepository) {}

  async execute({
    launchId,
    programmerType,
  }: DeleteLaunchInterfaceRequest): Promise<DeleteLaunchInterfaceResponse> {
    const launch = await this.launchRepository.findById(launchId);

    // if (!launch) throw new Error("Launch not found");
    if (!launch) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.launchRepository.delete(launch);

    return right({});
  }
}
