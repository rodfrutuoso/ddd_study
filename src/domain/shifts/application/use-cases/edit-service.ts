/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ServiceRepository } from "../repositories/service-repository";
import { Service } from "../../enterprise/entities/service";

interface EditServiceInterfaceRequest {
  serviceId: string;
  programmerType: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditServiceInterfaceResponse {
  service: Service;
}

export class EditService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({
    serviceId,
    programmerType,
    description,
  }: EditServiceInterfaceRequest): Promise<EditServiceInterfaceResponse> {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) throw new Error("Service not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    service.description = description ?? service.description;

    await this.serviceRepository.save(service);

    return { service };
  }
}
