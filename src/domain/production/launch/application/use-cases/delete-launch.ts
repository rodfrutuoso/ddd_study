/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { LaunchRepository } from "../repositories/launch-repository";

interface DeleteLaunchInterfaceRequest {
  launchId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteLaunchInterfaceResponse {}

export class DeleteLaunch {
  constructor(private launchRepository: LaunchRepository) {}

  async execute({
    launchId,
    programmerType,
  }: DeleteLaunchInterfaceRequest): Promise<DeleteLaunchInterfaceResponse> {
    const launch = await this.launchRepository.findById(launchId);

    if (!launch) throw new Error("Launch not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.launchRepository.delete(launch);

    return {};
  }
}
