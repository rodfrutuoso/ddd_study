import { PaginationParams } from "@/core/repositories/pagination-params";
import { VehicleResponse } from "@/domain/questions/vehicle/enterprise/entities/vehicleResponse";

export interface VehicleResponseRepository {
  create(vehicleResponse: VehicleResponse): Promise<void>;
  findMany(
    params: PaginationParams,
    shiftId: string
  ): Promise<Array<VehicleResponse>>;
  save(vehicleResponse: VehicleResponse): Promise<void>;
  findById(vehicleResponseId: string): Promise<VehicleResponse | null>;
}
