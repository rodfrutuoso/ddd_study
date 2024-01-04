/* eslint-disable no-useless-constructor */
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";

interface EditVehicleQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

interface EditVehicleQuestionInterfaceResponse {
  vehicleQuestion: VehicleQuestion;
}

export class EditVehicleQuestion {
  constructor(private vehicleQuestionRepository: VehicleQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditVehicleQuestionInterfaceRequest): Promise<EditVehicleQuestionInterfaceResponse> {
    const vehicleQuestion =
      await this.vehicleQuestionRepository.findById(questionId);

    if (!vehicleQuestion) throw new Error("VEHICLE Question not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    vehicleQuestion.endDate = vehicleQuestion.endDate ?? new Date();

    await this.vehicleQuestionRepository.save(vehicleQuestion);

    return { vehicleQuestion };
  }
}
