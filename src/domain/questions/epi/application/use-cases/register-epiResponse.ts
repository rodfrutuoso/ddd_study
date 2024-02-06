/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { EPIResponse } from "../../enterprise/entities/epiResponse";
import { EpiResponseRepository } from "../repositories/epiResponse-repository";
import { Either, right } from "@/core/either";

interface RegisterEpiResponseInterfaceRequest {
  questionId: string;
  shiftId: string;
  userId: string;
}

type RegisterEpiResponseInterfaceResponse = Either<
  null,
  { epiResponse: EPIResponse }
>;

export class RegisterEpiResponse {
  constructor(private epiResponseRepository: EpiResponseRepository) {}

  async execute({
    questionId,
    shiftId,
    userId,
  }: RegisterEpiResponseInterfaceRequest): Promise<RegisterEpiResponseInterfaceResponse> {
    const epiResponse = EPIResponse.create({
      questionId: new UniqueEntityId(questionId),
      shiftId: new UniqueEntityId(shiftId),
      userId: new UniqueEntityId(userId),
    });

    await this.epiResponseRepository.create(epiResponse);

    return right({ epiResponse });
  }
}
