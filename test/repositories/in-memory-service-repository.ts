import { ServiceRepository } from "@/domain/shifts/application/repositories/service-repository";
import { Service } from "@/domain/shifts/enterprise/entities/service";

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = [];
  async create(service: Service) {
    this.items.push(service);
  }

  //   async findMany(
  //     { page }: PaginationParams,
  //     supervisorId?: string,
  //     leaderId?: string,
  //     contract?: string,
  //     name?: string
  //   ): Promise<Service[]> {
  //     const services = this.items
  //       // eslint-disable-next-line prettier/prettier
  //       .filter(
  //         (service) =>
  //           !supervisorId || service.supervisorId?.toString() === supervisorId
  //       )
  //       .filter((service) => !leaderId || service.leaderId.toString() === leaderId)
  //       .filter((service) => !contract || service.contract === contract)
  //       .filter((service) => !name || service.name === name)
  //       .slice((page - 1) * 50, page * 50);

  //     return services;
  //   }

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
