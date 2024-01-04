import { PaginationParams } from "@/core/repositories/pagination-params";
import { VehicleQuestionRepository } from "@/domain/questions/application/repositories/vehicleQuestion-repository";
import { VehicleQuestion } from "@/domain/questions/enterprise/entities/vehicleQuestion";

export class InMemoryVehicleQuestionRepository
  implements VehicleQuestionRepository
{
  public items: VehicleQuestion[] = [];

  async create(vehicleQuestion: VehicleQuestion) {
    this.items.push(vehicleQuestion);
  }

  async findMany(
    { page }: PaginationParams,
    date?: Date,
    question?: string
  ): Promise<VehicleQuestion[]> {
    const vehicleQuestions = this.items
      .filter(
        (vehicleQuestion) =>
          !question || vehicleQuestion.question.includes(question)
      )
      .filter(
        (vehicleQuestion) =>
          !date ||
          (vehicleQuestion.startDate <= date &&
            (!vehicleQuestion.endDate || vehicleQuestion.endDate >= date))
      )
      .slice((page - 1) * 50, page * 50);

    return vehicleQuestions;
  }

  async save(vehicleQuestion: VehicleQuestion): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === vehicleQuestion.id
    );

    this.items[itemIndex] = vehicleQuestion;
  }

  async findById(VEHICLEQuestionId: string): Promise<VehicleQuestion | null> {
    const VEHICLEQuestion = this.items.find(
      (item) => item.id.toString() === VEHICLEQuestionId
    );

    if (!VEHICLEQuestion) return null;

    return VEHICLEQuestion;
  }
}
