/* eslint-disable no-useless-constructor */
import { Vehicle } from "../../enterprise/entities/vehicle";
import { VehicleRepository } from "../repositories/vehicle-repository";

interface GetVehicleByPlateInterfaceRequest {
  page: number;
  plate: string;
}

interface GetVehicleByPlateInterfaceResponse {
  vehicles: Array<Vehicle>;
}

export class GetVehicleByPlate {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute({
    page,
    plate,
  }: GetVehicleByPlateInterfaceRequest): Promise<GetVehicleByPlateInterfaceResponse> {
    const vehicles = await this.vehicleRepository.findMany({ page }, plate);

    return { vehicles };
  }
}
