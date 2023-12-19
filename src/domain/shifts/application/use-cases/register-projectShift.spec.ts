/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterProjectShift } from "./register-projectShift";
import { ProjectShiftRepository } from "@/domain/shifts/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

const fakeProjectShiftRepository: ProjectShiftRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (projectShift: ProjectShift): Promise<void> => {},
};

test("open a shift", async () => {
  const regiterProjectShift = new RegisterProjectShift(
    fakeProjectShiftRepository,
  );

  const result = await regiterProjectShift.execute({
    shiftId: "1",
    projectId: "2",
    projectStage: "LANÇAMENTO DE CABO",
    fieldReturn: "EXECUTADO",
    outOfSchedule: false,
  });

  expect(result.projectShift.id).toBeTruthy();
  expect(result.projectShift.projectStage).toEqual("LANÇAMENTO DE CABO");
  expect(result.projectShift.outOfSchedule).toEqual(false);
});
