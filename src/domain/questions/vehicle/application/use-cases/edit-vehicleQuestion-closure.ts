/* eslint-disable no-useless-constructor */
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { Either, left, right } from "@/core/either";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditVehicleQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

type EditVehicleQuestionInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { vehicleQuestion: VehicleQuestion }
>;

export class EditVehicleQuestion {
  constructor(private vehicleQuestionRepository: VehicleQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditVehicleQuestionInterfaceRequest): Promise<EditVehicleQuestionInterfaceResponse> {
    const vehicleQuestion =
      await this.vehicleQuestionRepository.findById(questionId);

    if (!vehicleQuestion) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    vehicleQuestion.endDate = vehicleQuestion.endDate ?? new Date();

    await this.vehicleQuestionRepository.save(vehicleQuestion);

    return right({ vehicleQuestion });
  }
}
