import { GetAprReportByProjectShift } from "./get-aprReport-by-projectShift";
import { InMemoryAprReportRepository } from "test/repositories/in-memory-aprReport-repository";
import { makeAprReport } from "test/factories/make-aprReport";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeShift } from "test/factories/make-shift";
import { makeProjectShift } from "test/factories/make-projectShift";
import { makeAprRisk } from "test/factories/make-aprRisk";
import { makeAprMeasure } from "test/factories/make-aprMeasure";

let inMemoryAprReportRepository: InMemoryAprReportRepository;
let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let inMemoryShiftRepository: InMemoryShiftRepository;
let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let sut: GetAprReportByProjectShift; // system under test

describe("Get AprReport By AprReport", () => {
  beforeEach(() => {
    inMemoryAprReportRepository = new InMemoryAprReportRepository();
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    inMemoryShiftRepository = new InMemoryShiftRepository();
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    sut = new GetAprReportByProjectShift(
      inMemoryAprReportRepository,
      inMemoryShiftRepository,
      inMemoryAprMeasureRepository,
      inMemoryAprRiskRepository,
      inMemoryProjectShiftRepository
    );
  });

  it("should be able to get a apr report from a projectShift", async () => {
    const shift = makeShift();
    await inMemoryShiftRepository.create(shift);

    const projectShift = makeProjectShift({ shiftId: shift.id });
    await inMemoryProjectShiftRepository.create(projectShift);

    const aprRisk1 = makeAprRisk({
      question: "Risco Eletrico 1",
      category: "Risco Eletrico",
    });
    const aprRisk2 = makeAprRisk({
      question: "Risco Eletrico 2",
      category: "Risco Eletrico",
    });
    const aprRisk3 = makeAprRisk({
      question: "Risco Eletrico 3",
      category: "Risco Eletrico",
    });
    const aprRisk4 = makeAprRisk({
      question: "Risco Eletrico 4",
      category: "Risco Eletrico",
      endDate: new Date("2023-12-31"),
    });
    const aprRisk5 = makeAprRisk({
      question: "Risco Instrumental 1",
      category: "Risco Instrumental",
    });
    const aprRisk6 = makeAprRisk({
      question: "Risco Instrumental 2",
      category: "Risco Instrumental",
    });

    await inMemoryAprRiskRepository.create(aprRisk1);
    await inMemoryAprRiskRepository.create(aprRisk2);
    await inMemoryAprRiskRepository.create(aprRisk3);
    await inMemoryAprRiskRepository.create(aprRisk4);
    await inMemoryAprRiskRepository.create(aprRisk5);
    await inMemoryAprRiskRepository.create(aprRisk6);

    const aprMeasure1 = makeAprMeasure({
      response: "Medida 1",
      category: "Risco Eletrico",
    });
    const aprMeasure2 = makeAprMeasure({
      response: "Medida 2",
      category: "Risco Eletrico",
    });
    const aprMeasure3 = makeAprMeasure({
      response: "Medida 3",
      category: "Risco Instrumental",
    });
    const aprMeasure4 = makeAprMeasure({
      response: "Medida 4",
      category: "Risco Instrumental",
    });

    await inMemoryAprMeasureRepository.create(aprMeasure1);
    await inMemoryAprMeasureRepository.create(aprMeasure2);
    await inMemoryAprMeasureRepository.create(aprMeasure3);
    await inMemoryAprMeasureRepository.create(aprMeasure4);

    const newAprReport1 = makeAprReport({
      activity: "IMPLANTAR POSTE",
      projectShiftId: projectShift.id,
      risksId: [aprRisk1.id, aprRisk2.id, aprRisk5.id],
      measuresId: [aprMeasure1.id, aprMeasure2.id, aprMeasure3.id],
    });

    await inMemoryAprReportRepository.create(newAprReport1);

    const { aprReport } = await sut.execute({
      projectShiftId: projectShift.id.toString(),
    });

    expect(aprReport).toHaveLength(2);
    expect(aprReport[0].risks).toHaveLength(3);
    expect(aprReport[1].measures).toHaveLength(1);
    expect(aprReport).not.toContain(aprRisk4);
  });

  it("should be able to get a empty list of apr reports when there is no apr risks or measures in the informed projectShift date", async () => {
    const shift = makeShift({ date: new Date("1963-10-10") });
    await inMemoryShiftRepository.create(shift);

    const projectShift = makeProjectShift({ shiftId: shift.id });
    await inMemoryProjectShiftRepository.create(projectShift);

    const aprRisk1 = makeAprRisk({
      question: "Risco Eletrico 1",
      category: "Risco Eletrico",
    });
    const aprRisk2 = makeAprRisk({
      question: "Risco Eletrico 2",
      category: "Risco Eletrico",
    });
    const aprRisk3 = makeAprRisk({
      question: "Risco Eletrico 3",
      category: "Risco Eletrico",
    });
    const aprRisk4 = makeAprRisk({
      question: "Risco Eletrico 4",
      category: "Risco Eletrico",
      endDate: new Date("2023-12-31"),
    });
    const aprRisk5 = makeAprRisk({
      question: "Risco Instrumental 1",
      category: "Risco Instrumental",
    });
    const aprRisk6 = makeAprRisk({
      question: "Risco Instrumental 2",
      category: "Risco Instrumental",
    });

    await inMemoryAprRiskRepository.create(aprRisk1);
    await inMemoryAprRiskRepository.create(aprRisk2);
    await inMemoryAprRiskRepository.create(aprRisk3);
    await inMemoryAprRiskRepository.create(aprRisk4);
    await inMemoryAprRiskRepository.create(aprRisk5);
    await inMemoryAprRiskRepository.create(aprRisk6);

    const aprMeasure1 = makeAprMeasure({
      response: "Medida 1",
      category: "Risco Eletrico",
    });
    const aprMeasure2 = makeAprMeasure({
      response: "Medida 2",
      category: "Risco Eletrico",
    });
    const aprMeasure3 = makeAprMeasure({
      response: "Medida 3",
      category: "Risco Instrumental",
    });
    const aprMeasure4 = makeAprMeasure({
      response: "Medida 4",
      category: "Risco Instrumental",
    });

    await inMemoryAprMeasureRepository.create(aprMeasure1);
    await inMemoryAprMeasureRepository.create(aprMeasure2);
    await inMemoryAprMeasureRepository.create(aprMeasure3);
    await inMemoryAprMeasureRepository.create(aprMeasure4);

    const newAprReport1 = makeAprReport({
      activity: "IMPLANTAR POSTE",
      projectShiftId: projectShift.id,
      risksId: [aprRisk1.id, aprRisk2.id, aprRisk5.id],
      measuresId: [aprMeasure1.id, aprMeasure2.id, aprMeasure3.id],
    });

    await inMemoryAprReportRepository.create(newAprReport1);

    const { aprReport } = await sut.execute({
      projectShiftId: projectShift.id.toString(),
    });

    expect(aprReport).toHaveLength(0);
  });

  it("should be able to throw a new error when there is no apr report from the informed projectShift", async () => {
    const shift = makeShift({ date: new Date("1963-10-10") });
    await inMemoryShiftRepository.create(shift);

    const projectShift = makeProjectShift({ shiftId: shift.id });
    await inMemoryProjectShiftRepository.create(projectShift);

    const aprRisk1 = makeAprRisk({
      question: "Risco Eletrico 1",
      category: "Risco Eletrico",
    });
    const aprRisk2 = makeAprRisk({
      question: "Risco Eletrico 2",
      category: "Risco Eletrico",
    });
    const aprRisk3 = makeAprRisk({
      question: "Risco Eletrico 3",
      category: "Risco Eletrico",
    });
    const aprRisk4 = makeAprRisk({
      question: "Risco Eletrico 4",
      category: "Risco Eletrico",
      endDate: new Date("2023-12-31"),
    });
    const aprRisk5 = makeAprRisk({
      question: "Risco Instrumental 1",
      category: "Risco Instrumental",
    });
    const aprRisk6 = makeAprRisk({
      question: "Risco Instrumental 2",
      category: "Risco Instrumental",
    });

    await inMemoryAprRiskRepository.create(aprRisk1);
    await inMemoryAprRiskRepository.create(aprRisk2);
    await inMemoryAprRiskRepository.create(aprRisk3);
    await inMemoryAprRiskRepository.create(aprRisk4);
    await inMemoryAprRiskRepository.create(aprRisk5);
    await inMemoryAprRiskRepository.create(aprRisk6);

    const aprMeasure1 = makeAprMeasure({
      response: "Medida 1",
      category: "Risco Eletrico",
    });
    const aprMeasure2 = makeAprMeasure({
      response: "Medida 2",
      category: "Risco Eletrico",
    });
    const aprMeasure3 = makeAprMeasure({
      response: "Medida 3",
      category: "Risco Instrumental",
    });
    const aprMeasure4 = makeAprMeasure({
      response: "Medida 4",
      category: "Risco Instrumental",
    });

    await inMemoryAprMeasureRepository.create(aprMeasure1);
    await inMemoryAprMeasureRepository.create(aprMeasure2);
    await inMemoryAprMeasureRepository.create(aprMeasure3);
    await inMemoryAprMeasureRepository.create(aprMeasure4);

    const newAprReport1 = makeAprReport({
      activity: "IMPLANTAR POSTE",
      projectShiftId: projectShift.id,
      risksId: [aprRisk1.id, aprRisk2.id, aprRisk5.id],
      measuresId: [aprMeasure1.id, aprMeasure2.id, aprMeasure3.id],
    });

    await inMemoryAprReportRepository.create(newAprReport1);

    expect(async () => {
      return await sut.execute({
        projectShiftId: "projectShift with no apr",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
