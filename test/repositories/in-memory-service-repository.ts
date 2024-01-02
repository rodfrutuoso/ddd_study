import { PaginationParams } from "@/core/repositories/pagination-params";
import { ServiceRepository } from "@/domain/shifts/application/repositories/service-repository";
import { Service } from "@/domain/shifts/enterprise/entities/service";

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = [];
  async create(service: Service) {
    this.items.push(service);
  }

  async findMany(
    { page }: PaginationParams,
    serviceCode?: string
  ): Promise<Service[]> {
    const service = this.items
      .filter((service) => !serviceCode || service.code.includes(serviceCode))
      .slice((page - 1) * 50, page * 50);

    return service;
  }

  //   async findById(serviceId: string) {
  //     const service = this.items.find((item) => item.id.toString() === serviceId);

  //     if (!service) return null;

  //     return service;
  //   }

  //   async delete(service: Service) {
  //     const itemIndex = this.items.findIndex((item) => item.id === service.id);

  //     this.items.splice(itemIndex, 1);
  //   }

  //   async save(service: Service) {
  //     const itemIndex = this.items.findIndex((item) => item.id === service.id);

  //     this.items[itemIndex] = service;
  //   }
}
