/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, left, right } from "@/core/either";
import { RequestRepository } from "../repositories/request-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteRequestInterfaceRequest {
  requestId: string;
  programmerType: string;
}

type DeleteRequestInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteRequest {
  constructor(private requestRepository: RequestRepository) {}

  async execute({
    requestId,
    programmerType,
  }: DeleteRequestInterfaceRequest): Promise<DeleteRequestInterfaceResponse> {
    const request = await this.requestRepository.findById(requestId);

    if (!request) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.requestRepository.delete(request);

    return right({});
  }
}
