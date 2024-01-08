import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  APRReport,
  APRReportProps,
} from "@/domain/questions/apr/enterprise/entities/aprReport";
import { faker } from "@faker-js/faker";

export function makeAprReport(
  override: Partial<APRReportProps> = {},
  id?: UniqueEntityId
) {
  const aprreport = APRReport.create(
    {
      projectShiftId: new UniqueEntityId(faker.string.uuid()),
      risksId: faker.helpers.arrayElements([
        new UniqueEntityId("dsad21"),
        new UniqueEntityId("dfsadw21"),
        new UniqueEntityId("2315fesf"),
        new UniqueEntityId("fasdfa21"),
        new UniqueEntityId("fwadsa"),
      ]),
      measuresId: faker.helpers.arrayElements([
        new UniqueEntityId("dsad21"),
        new UniqueEntityId("dfsadw21"),
        new UniqueEntityId("2315fesf"),
        new UniqueEntityId("fasdfa21"),
        new UniqueEntityId("fwadsa"),
      ]),
      activity: faker.word.verb(),
      ...override,
    },
    id
  );

  return aprreport;
}
