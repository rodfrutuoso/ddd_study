/* eslint-disable no-useless-constructor */
import { ShiftRepository } from "@/domain/production/shift/application/repositories/shift-repository";
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { EpiResponseRepository } from "../repositories/epiResponse-repository";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";
import { EPIResponse } from "../../enterprise/entities/epiResponse";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface EPIResponsesByQuestionsAvailable {
  question: string;
  response: "CONFORME" | "INCONFORME";
  userId?: string;
}

interface GetEPIResponseByShiftInterfaceRequest {
  shfitId: string;
  page: number;
}

type GetEPIResponseByShiftInterfaceResponse = Either<
  ResourceNotFoundError,
  { epiResponse: Array<EPIResponsesByQuestionsAvailable> }
>;

export class GetEPIResponseByShift {
  constructor(
    private epiResponseRepository: EpiResponseRepository,
    private shiftRepository: ShiftRepository,
    private epiQuestionRepository: EpiQuestionRepository
  ) {}

  async execute({
    shfitId,
    page,
  }: GetEPIResponseByShiftInterfaceRequest): Promise<GetEPIResponseByShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shfitId);

    if (!shift) return left(new ResourceNotFoundError("Turno não encontrado"));

    const epiQuestions: EPIQuestion[] = [];
    let count = 1;

    while (true) {
      const epiQuestionsSearch = await this.epiQuestionRepository.findMany(
        { page: count },
        shift.date
      );

      epiQuestionsSearch.map((question) => epiQuestions.push(question));
      count++;

      if (epiQuestionsSearch.length === 0) break;
    }

    const epiResponseInconformes: EPIResponse[] = [];
    count = 1;

    while (true) {
      const epiResponsesSearch = await this.epiResponseRepository.findMany(
        { page: count },
        shfitId
      );

      epiResponsesSearch.map((resp) => epiResponseInconformes.push(resp));
      count++;

      if (epiResponsesSearch.length === 0) break;
    }

    const epiResponse = epiQuestions
      .map((epiQuestion) => {
        const question = epiQuestion.question;
        const response: "CONFORME" | "INCONFORME" = epiResponseInconformes
          .map((resp) => resp.questionId)
          .includes(epiQuestion.id)
          ? "INCONFORME"
          : "CONFORME";
        const userId = epiResponseInconformes
          .find((resp) => resp.questionId === epiQuestion.id)
          ?.userId?.toString();

        return { question, response, userId };
      })
      .slice((page - 1) * 50, page * 50);

    return right({ epiResponse });
  }
}
