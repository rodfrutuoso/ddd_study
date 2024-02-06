/* eslint-disable no-useless-constructor */
import { ShiftRepository } from "@/domain/production/shift/application/repositories/shift-repository";
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { SmcResponseRepository } from "../repositories/smcResponse-repository";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { SMCResponse } from "../../enterprise/entities/smcResponse";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface SMCResponsesByQuestionsAvailable {
  question: string;
  response: "CONFORME" | "INCONFORME";
  flaw?: string;
  cameraCode?: string;
}

interface GetSMCResponseByShiftInterfaceRequest {
  shfitId: string;
  page: number;
}

type GetSMCResponseByShiftInterfaceResponse = Either<
  ResourceNotFoundError,
  { smcResponse: Array<SMCResponsesByQuestionsAvailable> }
>;

export class GetSMCResponseByShift {
  constructor(
    private smcResponseRepository: SmcResponseRepository,
    private shiftRepository: ShiftRepository,
    private smcQuestionRepository: SmcQuestionRepository
  ) {}

  async execute({
    shfitId,
    page,
  }: GetSMCResponseByShiftInterfaceRequest): Promise<GetSMCResponseByShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shfitId);

    if (!shift) return left(new ResourceNotFoundError());

    const smcQuestions: SMCQuestion[] = [];
    let count = 1;

    while (true) {
      const smcQuestionsSearch = await this.smcQuestionRepository.findMany(
        { page: count },
        shift.date
      );

      smcQuestionsSearch.map((question) => smcQuestions.push(question));
      count++;

      if (smcQuestionsSearch.length === 0) break;
    }

    const smcResponseInconformes: SMCResponse[] = [];
    count = 1;

    while (true) {
      const smcResponsesSearch = await this.smcResponseRepository.findMany(
        { page: count },
        shfitId
      );

      smcResponsesSearch.map((resp) => smcResponseInconformes.push(resp));
      count++;

      if (smcResponsesSearch.length === 0) break;
    }

    const smcResponse = smcQuestions
      .map((smcQuestion) => {
        const question = smcQuestion.question;
        const response: "CONFORME" | "INCONFORME" = smcResponseInconformes
          .map((resp) => resp.questionId)
          .includes(smcQuestion.id)
          ? "INCONFORME"
          : "CONFORME";
        const flaw = smcResponseInconformes.find(
          (resp) => resp.questionId === smcQuestion.id
        )?.flaw;
        const cameraCode = smcResponseInconformes.find(
          (resp) => resp.questionId === smcQuestion.id
        )?.cameraCode;

        return { question, response, flaw, cameraCode };
      })
      .slice((page - 1) * 50, page * 50);

    return right({ smcResponse });
  }
}
