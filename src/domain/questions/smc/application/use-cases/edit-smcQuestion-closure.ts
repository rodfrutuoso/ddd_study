/* eslint-disable no-useless-constructor */
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { Either, left, right } from "@/core/either";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditSmcQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

type EditSmcQuestionInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { smcQuestion: SMCQuestion }
>;

export class EditSmcQuestion {
  constructor(private smcQuestionRepository: SmcQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditSmcQuestionInterfaceRequest): Promise<EditSmcQuestionInterfaceResponse> {
    const smcQuestion = await this.smcQuestionRepository.findById(questionId);

    if (!smcQuestion) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    smcQuestion.endDate = smcQuestion.endDate ?? new Date();

    await this.smcQuestionRepository.save(smcQuestion);

    return right({ smcQuestion });
  }
}
