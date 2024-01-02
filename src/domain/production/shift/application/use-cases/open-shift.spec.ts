/* eslint-disable @typescript-eslint/no-empty-function */
import { OpenShift } from "./open-shift";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: OpenShift; // system under test

describe("Open a Shift", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new OpenShift(inMemoryShitRepository);
  });

  it("should send the data from a shift", async () => {
    const result = await sut.execute({
      teamId: "1",
      date: new Date("2023-12-15 00:00:00"),
      odometer_end: 1200,
      odometer_start: 1100,
      shift_end: "08:10:01",
      shift_start: "18:10:01",
      vehicle_id: "2",
    });

    expect(result.shift.teamId.toValue()).toEqual("1");
    expect(result.shift.shift_start).toEqual("18:10:01");
    expect(result.shift.date).toEqual(new Date("2023-12-15 00:00:00"));
  });
});
