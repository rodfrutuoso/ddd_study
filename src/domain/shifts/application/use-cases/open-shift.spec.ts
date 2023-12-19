/* eslint-disable @typescript-eslint/no-empty-function */
import { OpenShift } from "./open-shift";
import { ShitRepository } from "@/domain/shifts/application/repositories/shift-repository";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

const fakeShiftRepository: ShitRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (shift: Shift): Promise<void> => {},
};

test("open a shift", async () => {
  const openShift = new OpenShift(fakeShiftRepository);

  const result = await openShift.execute({
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
