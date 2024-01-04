import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  VehicleQuestion,
  VehicleQuestionProps,
} from "@/domain/questions/enterprise/entities/vehicleQuestion";
import { faker } from "@faker-js/faker";

export function makeVehicleQuestion(
  override: Partial<VehicleQuestionProps> = {},
  id?: UniqueEntityId
) {
  const Vehiclequestion = VehicleQuestion.create(
    {
      question: faker.lorem.sentence(),
      startDate: faker.date.between({
        from: new Date("2023-01-01"),
        to: new Date("2023-06-01"),
      }),
      endDate: undefined,
      ...override,
    },
    id
  );

  return Vehiclequestion;
}
