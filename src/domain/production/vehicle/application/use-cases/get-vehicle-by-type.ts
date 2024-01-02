/* eslint-disable no-useless-constructor */
import { Vehicle } from "../../enterprise/entities/vehicle";
import { VehicleRepository } from "../repositories/vehicle-repository";

interface GetVehicleByTypeInterfaceRequest {
  page: number;
  type: string;
}

interface GetVehicleByTypeInterfaceResponse {
  vehicles: Array<Vehicle>;
}

export class GetVehicleByType {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    page,
    type,
  }: GetVehicleByTypeInterfaceRequest): Promise<GetVehicleByTypeInterfaceResponse> {
    const vehicles = await this.vehicleRepository.findMany(
      { page },
      undefined,
      type
    );

    return { vehicles };
  }
}
