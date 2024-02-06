/* eslint-disable no-useless-constructor */
import { EPIQuestion } from "../../../epi/enterprise/entities/epiQuestion";
import { EpiQuestionRepository } from "../../../epi/application/repositories/epiQuestion-repository";
import { Either, right } from "@/core/either";

interface CreateEpiQuestionInterfaceRequest {
  question: string;
}

type CreateEpiQuestionInterfaceResponse = Either<
  null,
  { epiQuestion: EPIQuestion }
>;

export class CreateEpiQuestion {
  constructor(private epiQuestionRepository: EpiQuestionRepository) {}

  async execute({
    question,
  }: CreateEpiQuestionInterfaceRequest): Promise<CreateEpiQuestionInterfaceResponse> {
    const epiQuestion = EPIQuestion.create({
      question,
    });

    await this.epiQuestionRepository.create(epiQuestion);

    return right({ epiQuestion });
  }
}
