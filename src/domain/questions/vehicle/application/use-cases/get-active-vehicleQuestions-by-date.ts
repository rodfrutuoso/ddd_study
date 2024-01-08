/* eslint-disable no-useless-constructor */
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";

interface GetVEHICLEQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

interface GetVEHICLEQuestionByDateInterfaceResponse {
  vehiclequestion: Array<VehicleQuestion>;
}

export class GetVEHICLEQuestionByDate {
  constructor(private vehiclequestionRepository: VehicleQuestionRepository) {}

  async execute({
    date,
    page,
  }: GetVEHICLEQuestionByDateInterfaceRequest): Promise<GetVEHICLEQuestionByDateInterfaceResponse> {
    const vehiclequestion = await this.vehiclequestionRepository.findMany(
      { page },
      date
    );

    return { vehiclequestion };
  }
}
