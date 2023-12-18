import { Entity } from "../../core/entities/entity";

interface ServiceProps {
  code: string,
  description: string,
}

export class Service extends Entity<ServiceProps> {

}
