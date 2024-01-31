import { PaginationParams } from "@/core/repositories/pagination-params";
import { RequestRepository } from "@/domain/users/application/repositories/request-repository";
import { Request } from "@/domain/users/enterprise/entities/request";

export class InMemoryRequestRepository implements RequestRepository {
  public items: Request[] = [];

  async create(request: Request) {
    this.items.push(request);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Request[]> {
    const requests = this.items
      .filter((request) => !email || request.email?.includes(email))
      .filter((request) => !name || request.name.includes(name))
      .filter((request) => !cpf || request.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return requests;
  }

  async save(request: Request): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === request.id);

    this.items[itemIndex] = request;
  }

  async findById(RequestId: string): Promise<Request | null> {
    const Request = this.items.find((item) => item.id.toString() === RequestId);

    if (!Request) return null;

    return Request;
  }
}
