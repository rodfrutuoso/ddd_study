import { Shift } from "../entities/shift";
import { ShitRepository } from "../repositories/shift-repository";

interface OpenShiftInterface {
  teamId: String;
  date: Date;
}

export class OpenShift {
  constructor(private shiftRepository: ShitRepository) {}

  async execute({ teamId, date }: OpenShiftInterface) {
    const shift = new Shift({ teamId, date });

    await this.shiftRepository.create(shift)

    return shift;
  }
}
