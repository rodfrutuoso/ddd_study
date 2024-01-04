import { PaginationParams } from "@/core/repositories/pagination-params";
import { VehicleResponseRepository } from "@/domain/questions/application/repositories/vehicleResponse-repository";
import { VehicleResponse } from "@/domain/questions/enterprise/entities/vehicleResponse";

export class InMemoryVehicleResponseRepository
  implements VehicleResponseRepository
{
  public items: VehicleResponse[] = [];

  async create(vehicleResponse: VehicleResponse) {
    this.items.push(vehicleResponse);
  }

  async findMany(
    { page }: PaginationParams,
    shiftId: string
  ): Promise<VehicleResponse[]> {
    const vehicleResponses = this.items
      .filter(
        (vehicleResponse) =>
          !shiftId || vehicleResponse.shiftId.toString() === shiftId
      )
      .slice((page - 1) * 50, page * 50);

    return vehicleResponses;
  }

  async save(vehicleResponse: VehicleResponse): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === vehicleResponse.id
    );

    this.items[itemIndex] = vehicleResponse;
  }

  async findById(VEHICLEResponseId: string): Promise<VehicleResponse | null> {
    const VehicleResponse = this.items.find(
      (item) => item.id.toString() === VEHICLEResponseId
    );

    if (!VehicleResponse) return null;

    return VehicleResponse;
  }
}
