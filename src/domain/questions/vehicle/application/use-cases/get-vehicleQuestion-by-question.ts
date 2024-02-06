/* eslint-disable no-useless-constructor */
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { Either, right } from "@/core/either";

interface GetVEHICLEQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

type GetVEHICLEQuestionByQuestionInterfaceResponse = Either<
  null,
  { vehiclequestion: Array<VehicleQuestion> }
>;

export class GetVEHICLEQuestionByQuestion {
  constructor(private vehiclequestionRepository: VehicleQuestionRepository) {}

  async execute({
    question,
    page,
  }: GetVEHICLEQuestionByQuestionInterfaceRequest): Promise<GetVEHICLEQuestionByQuestionInterfaceResponse> {
    const vehiclequestion = await this.vehiclequestionRepository.findMany(
      { page },
      undefined,
      question
    );

    return right({ vehiclequestion });
  }
}
