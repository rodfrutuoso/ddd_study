/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Vehicle } from "../../enterprise/entities/vehicle";
import { VehicleRepository } from "../repositories/vehicle-repository";

interface RegisterVehicleInterfaceRequest {
  plate: string;
  type: string;
  teamId?: string;
}

interface RegisterVehicleInterfaceResponse {
  vehicle: Vehicle;
}

export class RegisterVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    plate,
    type,
    teamId,
  }: RegisterVehicleInterfaceRequest): Promise<RegisterVehicleInterfaceResponse> {
    const vehicle = Vehicle.create({
      plate,
      type,
      teamId: new UniqueEntityId(teamId),
      created_at: new Date(),
    });

    await this.vehicleRepository.create(vehicle);

    return { vehicle };
  }
}
