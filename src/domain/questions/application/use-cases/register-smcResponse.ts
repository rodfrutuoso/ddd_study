/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { SMCResponse } from "../../enterprise/entities/smcResponse";
import { SmcResponseRepository } from "../repositories/smcResponse-repository";

interface RegisterSmcResponseInterfaceRequest {
  questionId: string;
  shiftId: string;
  flaw?: string;
  cameraCode?: string;
}

interface RegisterSmcResponseInterfaceResponse {
  smcResponse: SMCResponse;
}

export class RegisterSmcResponse {
  constructor(private smcResponseRepository: SmcResponseRepository) {}

  async execute({
    questionId,
    shiftId,
    flaw,
    cameraCode,
  }: RegisterSmcResponseInterfaceRequest): Promise<RegisterSmcResponseInterfaceResponse> {
    const smcResponse = SMCResponse.create({
      questionId: new UniqueEntityId(questionId),
      shiftId: new UniqueEntityId(shiftId),
      flaw,
      cameraCode,
    });

    await this.smcResponseRepository.create(smcResponse);

    return { smcResponse };
  }
}
