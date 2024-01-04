import { PaginationParams } from "@/core/repositories/pagination-params";
import { VehicleQuestion } from "@/domain/questions/enterprise/entities/vehicleQuestion";

export interface VehicleQuestionRepository {
  create(vehicleQuestion: VehicleQuestion): Promise<void>;
  findMany(
    params: PaginationParams,
    date?: Date,
    question?: string
  ): Promise<Array<VehicleQuestion>>;
  save(vehicleQuestion: VehicleQuestion): Promise<void>;
  findById(vehicleQuestionId: string): Promise<VehicleQuestion | null>;
}
