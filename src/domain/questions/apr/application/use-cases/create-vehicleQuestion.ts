/* eslint-disable no-useless-constructor */
import { VehicleQuestion } from "../../../vehicle/enterprise/entities/vehicleQuestion";
import { VehicleQuestionRepository } from "../../../vehicle/application/repositories/vehicleQuestion-repository";
import { Either, right } from "@/core/either";

interface CreateVehicleQuestionInterfaceRequest {
  question: string;
}

type CreateVehicleQuestionInterfaceResponse = Either<
  null,
  { vehicleQuestion: VehicleQuestion }
>;

export class CreateVehicleQuestion {
  constructor(private vehicleQuestionRepository: VehicleQuestionRepository) {}

  async execute({
    question,
  }: CreateVehicleQuestionInterfaceRequest): Promise<CreateVehicleQuestionInterfaceResponse> {
    const vehicleQuestion = VehicleQuestion.create({
      question,
    });

    await this.vehicleQuestionRepository.create(vehicleQuestion);

    return right({ vehicleQuestion });
  }
}
