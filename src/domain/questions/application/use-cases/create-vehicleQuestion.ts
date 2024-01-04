/* eslint-disable no-useless-constructor */
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";

interface CreateVehicleQuestionInterfaceRequest {
  question: string;
}

interface CreateVehicleQuestionInterfaceResponse {
  vehicleQuestion: VehicleQuestion;
}

export class CreateVehicleQuestion {
  constructor(private vehicleQuestionRepository: VehicleQuestionRepository) {}

  async execute({
    question,
  }: CreateVehicleQuestionInterfaceRequest): Promise<CreateVehicleQuestionInterfaceResponse> {
    const vehicleQuestion = VehicleQuestion.create({
      question,
    });

    await this.vehicleQuestionRepository.create(vehicleQuestion);

    return { vehicleQuestion };
  }
}
