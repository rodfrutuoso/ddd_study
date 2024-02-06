/* eslint-disable no-useless-constructor */
import { RequestRepository } from "../repositories/request-repository";
import { Request } from "../../enterprise/entities/request";
import { Either, right } from "@/core/either";

interface GetRequestByNameInterfaceRequest {
  name: string;
  page: number;
}

type GetRequestByNameInterfaceResponse = Either<
  null,
  { request: Array<Request> }
>;

export class GetRequestByName {
  constructor(private requestRepository: RequestRepository) {}

  async execute({
    name,
    page,
  }: GetRequestByNameInterfaceRequest): Promise<GetRequestByNameInterfaceResponse> {
    const request = await this.requestRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return right({ request });
  }
}
