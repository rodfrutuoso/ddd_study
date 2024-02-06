/* eslint-disable no-useless-constructor */
import { ShiftRepository } from "@/domain/production/shift/application/repositories/shift-repository";
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { VehicleResponseRepository } from "../repositories/vehicleResponse-repository";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { VehicleResponse } from "../../enterprise/entities/vehicleResponse";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface VEHICLEResponsesByQuestionsAvailable {
  question: string;
  response: "CONFORME" | "INCONFORME";
  flaw?: string;
  cameraCode?: string;
}

interface GetVEHICLEResponseByShiftInterfaceRequest {
  shfitId: string;
  page: number;
}

type GetVEHICLEResponseByShiftInterfaceResponse = Either<
  ResourceNotFoundError,
  { vehicleResponse: Array<VEHICLEResponsesByQuestionsAvailable> }
>;

export class GetVEHICLEResponseByShift {
  constructor(
    private vehicleResponseRepository: VehicleResponseRepository,
    private shiftRepository: ShiftRepository,
    private vehicleQuestionRepository: VehicleQuestionRepository
  ) {}

  async execute({
    shfitId,
    page,
  }: GetVEHICLEResponseByShiftInterfaceRequest): Promise<GetVEHICLEResponseByShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shfitId);

    if (!shift) return left(new ResourceNotFoundError("Turno não encontrado"));

    const vehicleQuestions: VehicleQuestion[] = [];
    let count = 1;

    while (true) {
      const vehicleQuestionsSearch =
        await this.vehicleQuestionRepository.findMany(
          { page: count },
          shift.date
        );

      vehicleQuestionsSearch.map((question) => vehicleQuestions.push(question));
      count++;

      if (vehicleQuestionsSearch.length === 0) break;
    }

    const vehicleResponseInconformes: VehicleResponse[] = [];
    count = 1;

    while (true) {
      const vehicleResponsesSearch =
        await this.vehicleResponseRepository.findMany({ page: count }, shfitId);

      vehicleResponsesSearch.map((resp) =>
        vehicleResponseInconformes.push(resp)
      );
      count++;

      if (vehicleResponsesSearch.length === 0) break;
    }

    const vehicleResponse = vehicleQuestions
      .map((vehicleQuestion) => {
        const question = vehicleQuestion.question;
        const response: "CONFORME" | "INCONFORME" = vehicleResponseInconformes
          .map((resp) => resp.questionId)
          .includes(vehicleQuestion.id)
          ? "INCONFORME"
          : "CONFORME";
        const vehicleId = vehicleResponseInconformes
          .find((resp) => resp.questionId === vehicleQuestion.id)
          ?.vehicleId?.toString();

        return { question, response, vehicleId };
      })
      .slice((page - 1) * 50, page * 50);

    return right({ vehicleResponse });
  }
}
