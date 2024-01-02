/* eslint-disable no-useless-constructor */
import { Launch } from "../../enterprise/entities/launch";
import { Service } from "../../enterprise/entities/service";
import { LaunchRepository } from "../repositories/launch-repository";
import { ServiceRepository } from "../repositories/service-repository";

interface GetLaunchByContractInterfaceRequest {
  page: number;
  code: string;
}

interface GetLaunchByContractInterfaceResponse {
  launchs: Array<Launch>;
}

export class GetLaunchByService {
  constructor(
    private launchRepository: LaunchRepository,
    private serviceRepository: ServiceRepository
  ) {}

  async execute({
    page,
    code,
  }: GetLaunchByContractInterfaceRequest): Promise<GetLaunchByContractInterfaceResponse> {
    const services: Service[] = [];
    let count = 1;

    while (true) {
      const servicesSearch = await this.serviceRepository.findMany(
        { page: count },
        code
      );

      servicesSearch.map((service) => services.push(service));
      count++;

      if (servicesSearch.length === 0) break;
    }

    const servicesId = services.map((service) => service.id.toString());

    const launchs = await this.launchRepository.findMany({ page }, servicesId);

    return { launchs };
  }
}
