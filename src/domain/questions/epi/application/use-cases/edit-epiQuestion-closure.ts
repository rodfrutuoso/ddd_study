/* eslint-disable no-useless-constructor */
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";

interface EditEpiQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

interface EditEpiQuestionInterfaceResponse {
  epiQuestion: EPIQuestion;
}

export class EditEpiQuestion {
  constructor(private epiQuestionRepository: EpiQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditEpiQuestionInterfaceRequest): Promise<EditEpiQuestionInterfaceResponse> {
    const epiQuestion = await this.epiQuestionRepository.findById(questionId);

    if (!epiQuestion) throw new Error("EPI Question not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    epiQuestion.endDate = epiQuestion.endDate ?? new Date();

    await this.epiQuestionRepository.save(epiQuestion);

    return { epiQuestion };
  }
}
