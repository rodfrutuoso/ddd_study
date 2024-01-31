/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { RequestRepository } from "../repositories/request-repository";

interface DeleteRequestInterfaceRequest {
  requestId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteRequestInterfaceResponse {}

export class DeleteRequest {
  constructor(private requestRepository: RequestRepository) {}

  async execute({
    requestId,
    programmerType,
  }: DeleteRequestInterfaceRequest): Promise<DeleteRequestInterfaceResponse> {
    const request = await this.requestRepository.findById(requestId);

    if (!request) throw new Error("Request not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.requestRepository.delete(request);

    return {};
  }
}
