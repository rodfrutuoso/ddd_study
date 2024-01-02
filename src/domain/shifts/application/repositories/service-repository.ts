import { PaginationParams } from "@/core/repositories/pagination-params";
import { Service } from "@/domain/shifts/enterprise/entities/service";

export interface ServiceRepository {
  create(service: Service): Promise<void>;
  findMany(params: PaginationParams, code: string): Promise<Array<Service>>;
  findById(serviceId: string): Promise<Service | null>;
  save(service: Service): Promise<void>;
}
