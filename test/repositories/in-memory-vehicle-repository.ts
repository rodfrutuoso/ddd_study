import { PaginationParams } from "@/core/repositories/pagination-params";
import { VehicleRepository } from "@/domain/production/vehicle/application/repositories/vehicle-repository";
import { Vehicle } from "@/domain/production/vehicle/enterprise/entities/vehicle";

export class InMemoryVehicleRepository implements VehicleRepository {
  public items: Vehicle[] = [];

  async create(vehicle: Vehicle) {
    this.items.push(vehicle);
  }

  async findMany(
    { page }: PaginationParams,
    plate: string,
    type: string
  ): Promise<Vehicle[]> {
    const vehicle = this.items
      .filter((vehicle) => !plate || vehicle.plate === plate)
      .filter((vehicle) => !type || vehicle.type === type)
      .slice((page - 1) * 50, page * 50);

    return vehicle;
  }

  async save(vehicle: Vehicle): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === vehicle.id);

    this.items[itemIndex] = vehicle;
  }

  async findById(vehicleId: string): Promise<Vehicle | null> {
    const vehicle = this.items.find((item) => item.id.toString() === vehicleId);

    if (!vehicle) return null;

    return vehicle;
  }
}
