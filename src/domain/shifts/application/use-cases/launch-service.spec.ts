/* eslint-disable @typescript-eslint/no-empty-function */
import { LaunchService } from "./launch-service";
import { LaunchRepository } from "@/domain/shifts/application/repositories/launch-repository";
import { Launch } from "../../enterprise/entities/launch";

const fakeLaunchRepository: LaunchRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (launch: Launch): Promise<void> => {},
};

test("lanch a service", async () => {
  const launchService = new LaunchService(fakeLaunchRepository);

  const result = await launchService.execute({
    projectShiftId: "1",
    value: 35.5,
    serviceId: "2",
  });

  expect(result.launch.projectShiftId.toValue()).toEqual("1");
  expect(result.launch.value.number).toEqual(35.5);
  expect(result.launch.id).toBeTruthy();
});
