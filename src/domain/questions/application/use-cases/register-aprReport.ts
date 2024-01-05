/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { APRReport } from "../../enterprise/entities/aprReport";
import { AprReportRepository } from "../repositories/aprReport-repository";

interface RegisterAprReportInterfaceRequest {
  projectShiftId: string;
  risksId: Array<string>;
  measuresId: Array<string>;
  activity: string;
}

interface RegisterAprReportInterfaceResponse {
  aprReport: APRReport;
}

export class RegisterAprReport {
  constructor(private aprReportRepository: AprReportRepository) {}

  async execute({
    projectShiftId,
    risksId,
    measuresId,
    activity,
  }: RegisterAprReportInterfaceRequest): Promise<RegisterAprReportInterfaceResponse> {
    const risksIdFormated = risksId.map((riskid) => new UniqueEntityId(riskid));
    const measuresIdFormated = measuresId.map(
      (measureId) => new UniqueEntityId(measureId)
    );

    const aprReport = APRReport.create({
      projectShiftId: new UniqueEntityId(projectShiftId),
      risksId: risksIdFormated,
      measuresId: measuresIdFormated,
      activity,
    });

    await this.aprReportRepository.create(aprReport);

    return { aprReport };
  }
}
