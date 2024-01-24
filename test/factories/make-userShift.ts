import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  UserShift,
  UserShiftProps,
} from "@/domain/production/userShift/enterprise/entities/userShift";
import { faker } from "@faker-js/faker";

export function makeUserShift(
  override: Partial<UserShiftProps> = {},
  id?: UniqueEntityId
) {
  const usershift = UserShift.create(
    {
      shiftId: new UniqueEntityId(faker.string.uuid()),
      userId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id
  );

  return usershift;
}
