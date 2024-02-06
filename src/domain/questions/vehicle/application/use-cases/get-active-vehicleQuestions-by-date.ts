/* eslint-disable no-useless-constructor */
import { VehicleQuestionRepository } from "../repositories/vehicleQuestion-repository";
import { VehicleQuestion } from "../../enterprise/entities/vehicleQuestion";
import { Either, right } from "@/core/either";

interface GetVEHICLEQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

type GetVEHICLEQuestionByDateInterfaceResponse = Either<
  null,
  { vehiclequestion: Array<VehicleQuestion> }
>;

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

    return right({ vehiclequestion });
  }
}
