/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterTst } from "./register-tst";
import { InMemoryTstRepository } from "test/repositories/in-memory-tst-repository";
import { makeTst } from "test/factories/make-tst";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";

let inMemoryTstRepository: InMemoryTstRepository;
let sut: RegisterTst; // system under test

describe("Register a Tst-Shift", () => {
  beforeEach(() => {
    inMemoryTstRepository = new InMemoryTstRepository();
    sut = new RegisterTst(inMemoryTstRepository);
  });

  it("should create a TST user", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "tst",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.tst.id).toBeTruthy();
      expect(result.value?.tst.created_by).toBeInstanceOf(UniqueEntityId);
    }
  });

  it("should not be able to create a tst with an unsed email", async () => {
    const newTst = makeTst({ email: "joaopamonha@ecoeletrica.com.br" });

    await inMemoryTstRepository.create(newTst);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "tst",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyRegistered);
  });

  it("should not be able to create a tst with an unsed cpf", async () => {
    const newTst = makeTst({ cpf: 12345678910 });

    await inMemoryTstRepository.create(newTst);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "tst",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered);
  });

  it("should not be able to create a tst with an email that is not from ecoeletrica.com.br", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@gmail.com.br",
      password: "minhaSenha",
      type: "tst",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.value).toBeInstanceOf(EmailNotEcoeletrica);
    expect(result.isLeft()).toBeTruthy();
  });
});
