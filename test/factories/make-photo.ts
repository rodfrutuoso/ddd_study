import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Photo, PhotoProps } from "@/domain/utils/enterprise/entities/photo";
import { faker } from "@faker-js/faker";

export function makePhoto(
  override: Partial<PhotoProps> = {},
  id?: UniqueEntityId
) {
  const booleanAux = faker.datatype.boolean();
  const photo = Photo.create(
    {
      type: booleanAux
        ? undefined
        : faker.helpers.arrayElement(["SMC", "EPI", "APR", "CAVA"]),
      typeId: booleanAux ? undefined : new UniqueEntityId(faker.string.uuid()),
      shiftId: new UniqueEntityId(faker.string.uuid()),
      linkDrive: faker.internet.url(),
      ...override,
    },
    id
  );

  return photo;
}
