/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { VehicleResponse } from "../../enterprise/entities/vehicleResponse";
import { VehicleResponseRepository } from "../repositories/vehicleResponse-repository";
import { Either, right } from "@/core/either";

interface RegisterVehicleResponseInterfaceRequest {
  questionId: string;
  shiftId: string;
  vehicleId?: string;
}

type RegisterVehicleResponseInterfaceResponse = Either<
  null,
  { vehicleResponse: VehicleResponse }
>;

export class RegisterVehicleResponse {
  constructor(private vehicleResponseRepository: VehicleResponseRepository) {}

  async execute({
    questionId,
    shiftId,
    vehicleId,
  }: RegisterVehicleResponseInterfaceRequest): Promise<RegisterVehicleResponseInterfaceResponse> {
    const vehicleResponse = VehicleResponse.create({
      questionId: new UniqueEntityId(questionId),
      shiftId: new UniqueEntityId(shiftId),
      vehicleId: new UniqueEntityId(vehicleId),
    });

    await this.vehicleResponseRepository.create(vehicleResponse);

    return right({ vehicleResponse });
  }
}
