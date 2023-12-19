import { Launch } from "@/domain/shifts/enterprise/entities/launch";

export interface LaunchRepository {
  create(launch: Launch): Promise<void>;
}
