/* eslint-disable no-useless-constructor */
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface EditEpiQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

type EditEpiQuestionInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { epiQuestion: EPIQuestion }
>;

export class EditEpiQuestion {
  constructor(private epiQuestionRepository: EpiQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditEpiQuestionInterfaceRequest): Promise<EditEpiQuestionInterfaceResponse> {
    const epiQuestion = await this.epiQuestionRepository.findById(questionId);

    if (!epiQuestion) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    epiQuestion.endDate = epiQuestion.endDate ?? new Date();

    await this.epiQuestionRepository.save(epiQuestion);

    return right({ epiQuestion });
  }
}
