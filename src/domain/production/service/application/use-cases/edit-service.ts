/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ServiceRepository } from "../repositories/service-repository";
import { Service } from "../../enterprise/entities/service";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditServiceInterfaceRequest {
  serviceId: string;
  programmerType: string;
  description: string;
}

type EditServiceInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { service: Service }
>;

export class EditService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({
    serviceId,
    programmerType,
    description,
  }: EditServiceInterfaceRequest): Promise<EditServiceInterfaceResponse> {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    service.description = description ?? service.description;

    await this.serviceRepository.save(service);

    return right({ service });
  }
}
