import { Service } from "@/domain/shifts/enterprise/entities/service";

export interface ServiceRepository {
  create(service: Service): Promise<void>;
  //   findMany(
  //     params: PaginationParams,
  //     supervisorId?: string,
  //     leaderId?: string,
  //     contract?: string,
  //     name?: string
  //   ): Promise<Array<Service>>;
  //   findById(serviceId: string): Promise<Service | null>;
  //   delete(service: Service): Promise<void>;
  //   save(service: Service): Promise<void>;
}
