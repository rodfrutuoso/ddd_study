/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { LaunchRepository } from "../repositories/launch-repository";
import { Value } from "../../enterprise/entities/value-objects/value";
import { Launch } from "../../enterprise/entities/launch";

interface EditLaunchInterfaceRequest {
  launchId: string;
  programmerType: string;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditLaunchInterfaceResponse {
  launch: Launch;
}

export class EditLaunch {
  constructor(private launchRepository: LaunchRepository) {}

  async execute({
    launchId,
    programmerType,
    value,
  }: EditLaunchInterfaceRequest): Promise<EditLaunchInterfaceResponse> {
    const launch = await this.launchRepository.findById(launchId);

    if (!launch) throw new Error("Launch not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    launch.value = new Value(value) ?? launch.value;

    await this.launchRepository.save(launch);

    return { launch };
  }
}
