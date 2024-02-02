/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, right } from "@/core/either";
import { Service } from "../../enterprise/entities/service";
import { ServiceRepository } from "../repositories/service-repository";

interface RegisterServiceInterfaceRequest {
  code: string;
  description: string;
}

type RegisterServiceInterfaceResponse = Either<null, { service: Service }>;

export class RegisterService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({
    code,
    description,
  }: RegisterServiceInterfaceRequest): Promise<RegisterServiceInterfaceResponse> {
    const service = Service.create({
      code,
      description,
    });

    await this.serviceRepository.create(service);

    return right({ service });
  }
}
