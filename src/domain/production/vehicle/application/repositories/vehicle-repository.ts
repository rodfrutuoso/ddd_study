import { PaginationParams } from "@/core/repositories/pagination-params";
import { Vehicle } from "@/domain/production/vehicle/enterprise/entities/vehicle";

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<void>;
  findMany(
    params: PaginationParams,
    plate?: string,
    type?: string
  ): Promise<Array<Vehicle>>;
  save(vehicle: Vehicle): Promise<void>;
  findById(vehicleId: string): Promise<Vehicle | null>;
}
