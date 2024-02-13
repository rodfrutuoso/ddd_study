/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterRequest } from "./register-request";
import { InMemoryRequestRepository } from "test/repositories/in-memory-request-repository";
import { makeRequest } from "test/factories/make-request";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";

let inMemoryRequestRepository: InMemoryRequestRepository;
let sut: RegisterRequest; // system under test

describe("Register a Request-Shift", () => {
  beforeEach(() => {
    inMemoryRequestRepository = new InMemoryRequestRepository();
    sut = new RegisterRequest(inMemoryRequestRepository);
  });

  it("should create a REQUEST user", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "request",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team ID test",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.request.id).toBeTruthy();
      expect(result.value?.request.created_by).toBeInstanceOf(UniqueEntityId);
    }
  });

  it("should not be able to create a request with an used email", async () => {
    const newRequest = makeRequest({ email: "joaopamonha@ecoeletrica.com.br" });

    await inMemoryRequestRepository.create(newRequest);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "request",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyRegistered);
  });

  it("should not be able to create a request with an used cpf", async () => {
    const newRequest = makeRequest({ cpf: 12345678910 });

    await inMemoryRequestRepository.create(newRequest);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "request",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered);
  });

  it("should not be able to create a request with an email that is not from ecoeletrica.com.br", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@gmail.com.br",
      password: "minhaSenha",
      type: "request",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.value).toBeInstanceOf(EmailNotEcoeletrica);
    expect(result.isLeft()).toBeTruthy();
  });
});
