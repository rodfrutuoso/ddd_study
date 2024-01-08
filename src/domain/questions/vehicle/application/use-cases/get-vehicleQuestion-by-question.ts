/* eslint-disable no-useless-constructor */
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";

interface GetVEHICLEQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

interface GetVEHICLEQuestionByQuestionInterfaceResponse {
  vehiclequestion: Array<VehicleQuestion>;
}

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

    return { vehiclequestion };
  }
}
