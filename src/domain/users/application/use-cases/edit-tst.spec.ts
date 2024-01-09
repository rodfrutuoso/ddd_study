/* eslint-disable @typescript-eslint/no-empty-function */
import { EditTst } from "./edit-tst";
import { InMemoryTstRepository } from "test/repositories/in-memory-tst-repository";
import { makeTst } from "test/factories/make-tst";

let inMemoryTstRepository: InMemoryTstRepository;
let sut: EditTst; // system under test

describe("Edit VEHICLE Name By Id", () => {
  beforeEach(() => {
    inMemoryTstRepository = new InMemoryTstRepository();
    sut = new EditTst(inMemoryTstRepository);
  });

  it("should be albe to edit a vehicle name by its id", async () => {
    const newTst = await makeTst({
      name: "João da Pamonha",
    });

    await inMemoryTstRepository.create(newTst);

    await sut.execute({
      tstId: newTst.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      name: "João da Pimbada",
    });

    expect(await inMemoryTstRepository.items[0]).toMatchObject({
      id: newTst.id,
      name: "João da Pimbada",
    });
    expect(await inMemoryTstRepository.items[0].updated_at).toBeInstanceOf(
      Date
    );
  });

  it("should not be albe to edit a vehicle name by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newTst = await makeTst({
      name: "João da Pamonha",
    });

    await inMemoryTstRepository.create(newTst);

    expect(async () => {
      return await sut.execute({
        tstId: newTst.id.toString(),
        programmerType: "CAMPO",
        name: "João da Pimbada",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
