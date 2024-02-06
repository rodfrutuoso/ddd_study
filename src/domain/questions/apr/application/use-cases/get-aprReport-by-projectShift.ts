/* eslint-disable no-useless-constructor */
import { ShiftRepository } from "@/domain/production/shift/application/repositories/shift-repository";
import { AprReportRepository } from "../repositories/aprReport-repository";
import { ProjectShiftRepository } from "@/domain/production/projectShift/application/repositories/projectShift-repository";
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface RiskProp {
  title: string;
  mark: "X" | undefined;
}

interface AprReportByCategory {
  category: string;
  risks: Array<RiskProp>;
  measures: Array<string>;
}

interface GetAprReportByProjectShiftInterfaceRequest {
  projectShiftId: string;
}

type GetAprReportByProjectShiftInterfaceResponse = Either<
  ResourceNotFoundError,
  { aprReport: AprReportByCategory[] }
>;

export class GetAprReportByProjectShift {
  constructor(
    private aprReportRepository: AprReportRepository,
    private shiftRepository: ShiftRepository,
    private aprMeasureRepository: AprMeasureRepository,
    private aprRiskRepository: AprRiskRepository,
    private projectShiftRepository: ProjectShiftRepository
  ) {}

  async execute({
    projectShiftId,
  }: GetAprReportByProjectShiftInterfaceRequest): Promise<GetAprReportByProjectShiftInterfaceResponse> {
    const projectShift =
      await this.projectShiftRepository.findById(projectShiftId);

    if (!projectShift)
      return left(new ResourceNotFoundError("projetoTurno não encontrado"));

    const shift = await this.shiftRepository.findById(
      projectShift.shiftId.toString()
    );

    if (!shift) return left(new ResourceNotFoundError("turno não encontrado"));

    const count = 1;

    const aprReports = await this.aprReportRepository.findMany(
      { page: count },
      projectShiftId
    );

    const aprRisks = await this.aprRiskRepository.findMany(
      { page: count },
      shift.date
    );

    let categories = aprRisks.map((risk) => risk.category);

    categories = [...new Set(categories)];

    const risksInRport = await Promise.all(
      aprReports[aprReports.length - 1].risksId.map(
        async (risk) => await this.aprRiskRepository.findById(risk.toString())
      )
    );

    const risksInRportQuestions = (await risksInRport).map(
      (riskMap) => riskMap?.question
    );

    const measuresInRport = await Promise.all(
      aprReports[aprReports.length - 1].measuresId.map(
        async (measure) =>
          await this.aprMeasureRepository.findById(measure.toString())
      )
    );

    const aprReport = await Promise.all(
      categories.map(async (category) => {
        const risksInformat = aprRisks.map((riskMap) => {
          if (category.includes(riskMap.category)) {
            const response: RiskProp = {
              title: riskMap.question,
              mark: risksInRportQuestions.includes(riskMap.question)
                ? "X"
                : undefined,
            };
            return response;
          }

          return undefined;
        });

        const risks: Array<RiskProp> = risksInformat.filter(
          (risMap): risMap is RiskProp => risMap !== undefined
        );

        const measures: Array<string> = (await measuresInRport)
          .map((measureMap) => {
            if (measureMap?.category.includes(category))
              return measureMap?.response;

            return undefined;
          })
          .filter(
            (measureMap): measureMap is string => measureMap !== undefined
          );

        const resultMap: AprReportByCategory = { category, risks, measures };

        return resultMap;
      })
    );

    return right({ aprReport });
  }
}
