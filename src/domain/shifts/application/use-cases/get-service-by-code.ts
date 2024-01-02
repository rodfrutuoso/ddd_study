/* eslint-disable no-useless-constructor */
import { Service } from "../../enterprise/entities/service";
import { ServiceRepository } from "../repositories/service-repository";

interface GetServiceByCodeInterfaceRequest {
  page: number;
  code: string;
}

interface GetServiceByServiceInterfaceResponse {
  services: Array<Service>;
}

export class GetServiceByCode {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({
    page,
    code,
  }: GetServiceByCodeInterfaceRequest): Promise<GetServiceByServiceInterfaceResponse> {
    const services = await this.serviceRepository.findMany({ page }, code);

    return { services };
  }
}
