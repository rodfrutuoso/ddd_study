/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { VehicleRepository } from "../repositories/vehicle-repository";
import { Vehicle } from "../../enterprise/entities/vehicle";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface EditVehicleInterfaceRequest {
  vehicleId: string;
  programmerType: string;
  teamId?: string;
  type: string;
}

interface EditVehicleInterfaceResponse {
  vehicle: Vehicle;
}

export class EditVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    vehicleId,
    programmerType,
    teamId,
    type,
  }: EditVehicleInterfaceRequest): Promise<EditVehicleInterfaceResponse> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) throw new Error("Vehicle not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    vehicle.teamId =
      teamId !== undefined ? new UniqueEntityId(teamId) : vehicle.teamId;
    vehicle.type = type ?? vehicle.type;

    await this.vehicleRepository.save(vehicle);

    return { vehicle };
  }
}
