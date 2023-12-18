import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface VehicleProps {
  teamId: UniqueEntityId;
  plate: string;
  type: string;
}

export class Vehicle extends Entity<VehicleProps> {

}