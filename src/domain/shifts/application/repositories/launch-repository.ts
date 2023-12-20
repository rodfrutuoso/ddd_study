import { Launch } from "@/domain/shifts/enterprise/entities/launch";

export interface LaunchRepository {
  create(launch: Launch): Promise<void>;
  findById(launchId: string): Promise<Launch | null>;
  delete(launch: Launch): Promise<void>;
  save(launch: Launch): Promise<void>;
}
