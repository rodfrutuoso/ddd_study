/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterAprReport } from "./register-aprReport";
import { InMemoryAprReportRepository } from "test/repositories/in-memory-aprReport-repository";

let inMemoryAprReportRepository: InMemoryAprReportRepository;
let sut: RegisterAprReport; // system under test

describe("Register a AprReport-Shift", () => {
  beforeEach(() => {
    inMemoryAprReportRepository = new InMemoryAprReportRepository();
    sut = new RegisterAprReport(inMemoryAprReportRepository);
  });

  it("should create a EPI response of a question", async () => {
    const result = await sut.execute({
      projectShiftId: "project shift id 1",
      risksId: ["riskId1", "riskId3", "riskId3"],
      measuresId: ["measureId1", "measureId3"],
      activity: "user id - 1",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprReport.id).toBeTruthy();
    expect(result.value?.aprReport.activity).toEqual("user id - 1");
    expect(result.value?.aprReport.risksId).toBeInstanceOf(
      Array<UniqueEntityId>
    );
  });
});
