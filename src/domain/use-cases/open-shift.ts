import { Shift } from "../entities/shift";

interface OpenShiftInterface {
  teamId: String;
  date: Date;
}

export class OpenShift {
  execute({ teamId, date }: OpenShiftInterface) {
    const shift = new Shift({teamId, date});

    return shift;
  }
}
