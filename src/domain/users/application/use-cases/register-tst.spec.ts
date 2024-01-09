/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterTst } from "./register-tst";
import { InMemoryTstRepository } from "test/repositories/in-memory-tst-repository";
import { makeTst } from "test/factories/make-tst";

let inMemoryTstRepository: InMemoryTstRepository;
let sut: RegisterTst; // system under test

describe("Register a Tst-Shift", () => {
  beforeEach(() => {
    inMemoryTstRepository = new InMemoryTstRepository();
    sut = new RegisterTst(inMemoryTstRepository);
  });

  it("should create a TST user", async () => {
    const { tst } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "tst",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(tst.id).toBeTruthy();
    expect(tst.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a tst with an unsed email", async () => {
    const newTst = makeTst({ email: "joaopamonha@ecoeletrica.com.br" });

    await inMemoryTstRepository.create(newTst);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "tst",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a tst with an unsed cpf", async () => {
    const newTst = makeTst({ cpf: 12345678910 });

    await inMemoryTstRepository.create(newTst);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "tst",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a tst with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "tst",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
