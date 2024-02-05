/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Vehicle } from "../../enterprise/entities/vehicle";
import { VehicleRepository } from "../repositories/vehicle-repository";

interface GetVehicleByTypeInterfaceRequest {
  page: number;
  type: string;
}

type GetVehicleByTypeInterfaceResponse = Either<
  null,
  { vehicles: Array<Vehicle> }
>;

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

    return right({ vehicles });
  }
}
