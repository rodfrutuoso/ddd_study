/* eslint-disable @typescript-eslint/no-empty-function */
import { LaunchService } from "./launch-service";
import { InMemoryLaunchRepository } from "test/repositories/in-memory-launch-repository";

let inMemoryLaunchRepository: InMemoryLaunchRepository;
let sut: LaunchService; // system under test

describe("Launch Service", () => {
  beforeEach(() => {
    inMemoryLaunchRepository = new InMemoryLaunchRepository();
    sut = new LaunchService(inMemoryLaunchRepository);
  });
  it("should be able to launch a service of a specific project in a shift", async () => {
    const result = await sut.execute({
      projectShiftId: "1",
      value: 35.5,
      serviceId: "2",
    });

    expect(result.value?.launch.projectShiftId.toValue()).toEqual("1");
    expect(result.value?.launch.value.number).toEqual(35.5);
    expect(result.value?.launch.id).toBeTruthy();
  });
});
