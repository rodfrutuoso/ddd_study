import { Entity } from "../../core/entities/entity";
import { Optinal } from "../../core/entities/types/optional";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface VehicleProps {
  teamId: UniqueEntityId;
  plate: string;
  type: string;
  created_at: Date;
}

export class Vehicle extends Entity<VehicleProps> {
    static create(
        props: Optinal<VehicleProps, "created_at">,
        id?: UniqueEntityId
      ) {
        const vehicle = new Vehicle(
          {
            ...props,
            created_at: new Date(),
          },
          id
        );
    
        return vehicle;
      }

}