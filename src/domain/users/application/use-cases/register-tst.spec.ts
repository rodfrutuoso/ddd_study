/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterTst } from "./register-tst";
import { InMemoryTstRepository } from "test/repositories/in-memory-tst-repository";

let inMemoryTstRepository: InMemoryTstRepository;
let sut: RegisterTst; // system under test

describe("Register a Tst-Shift", () => {
  beforeEach(() => {
    inMemoryTstRepository = new InMemoryTstRepository();
    sut = new RegisterTst(inMemoryTstRepository);
  });

  it("should create a VEHICLE response of a question", async () => {
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
});
