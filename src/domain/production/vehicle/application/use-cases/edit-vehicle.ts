/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { VehicleRepository } from "../repositories/vehicle-repository";
import { Vehicle } from "../../enterprise/entities/vehicle";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditVehicleInterfaceRequest {
  vehicleId: string;
  programmerType: string;
  teamId?: string;
  type: string;
}

type EditVehicleInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { vehicle: Vehicle }
>;

export class EditVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    vehicleId,
    programmerType,
    teamId,
    type,
  }: EditVehicleInterfaceRequest): Promise<EditVehicleInterfaceResponse> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    vehicle.teamId =
      teamId !== undefined ? new UniqueEntityId(teamId) : vehicle.teamId;
    vehicle.type = type ?? vehicle.type;

    await this.vehicleRepository.save(vehicle);

    return right({ vehicle });
  }
}
