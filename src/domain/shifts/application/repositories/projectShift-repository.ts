import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export interface ProjectShiftRepository {
  create(projectShift: ProjectShift): Promise<void>;
}
