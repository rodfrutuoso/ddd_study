/* eslint-disable no-useless-constructor */
import { ProjectShiftRepository } from "../repositories/projectShift-repository";
import { ProjectShift } from "../../enterprise/entities/projectShift";
import { Either, right } from "@/core/either";

interface GetProjectShiftByProjectInterfaceRequest {
  projectId: string;
  page: number;
}

type GetProjectShiftByProjectInterfaceResponse = Either<
  null,
  { projectShifts: Array<ProjectShift> }
>;

export class GetProjectShiftByProject {
  constructor(private projectShiftRepository: ProjectShiftRepository) {}

  async execute({
    projectId,
    page,
  }: GetProjectShiftByProjectInterfaceRequest): Promise<GetProjectShiftByProjectInterfaceResponse> {
    const projectShifts = await this.projectShiftRepository.findMany(
      { page },
      projectId
    );

    return right({ projectShifts });
  }
}
