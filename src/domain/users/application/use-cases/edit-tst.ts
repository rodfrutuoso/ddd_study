/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Tst } from "../../enterprise/entities/tst";
import { TstRepository } from "../repositories/tst-repository";

interface EditTstInterfaceRequest {
  tstId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

interface EditTstInterfaceResponse {
  tst: Tst;
}

export class EditTst {
  constructor(private tstRepository: TstRepository) {}

  async execute({
    tstId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditTstInterfaceRequest): Promise<EditTstInterfaceResponse> {
    const tst = await this.tstRepository.findById(tstId);

    if (!tst) throw new Error("tst not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    tst.name = name ?? tst.name;
    tst.password = password ?? tst.password;
    tst.deactivation_date = deactivation_date ?? tst.deactivation_date;

    await this.tstRepository.save(tst);

    return { tst };
  }
}
