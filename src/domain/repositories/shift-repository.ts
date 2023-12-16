import { Shift } from "../entities/shift";

export interface ShitRepository {
    create(shift:Shift): Promise<void>
}