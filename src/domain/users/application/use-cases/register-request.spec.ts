/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterRequest } from "./register-request";
import { InMemoryRequestRepository } from "test/repositories/in-memory-request-repository";
import { makeRequest } from "test/factories/make-request";

let inMemoryRequestRepository: InMemoryRequestRepository;
let sut: RegisterRequest; // system under test

describe("Register a Request-Shift", () => {
  beforeEach(() => {
    inMemoryRequestRepository = new InMemoryRequestRepository();
    sut = new RegisterRequest(inMemoryRequestRepository);
  });

  it("should create a REQUEST user", async () => {
    const { request } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "request",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team ID test",
    });

    expect(request.id).toBeTruthy();
    expect(request.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a request with an used email", async () => {
    const newRequest = makeRequest({ email: "joaopamonha@ecoeletrica.com.br" });

    await inMemoryRequestRepository.create(newRequest);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "request",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a request with an used cpf", async () => {
    const newRequest = makeRequest({ cpf: 12345678910 });

    await inMemoryRequestRepository.create(newRequest);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "request",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a request with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "request",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
