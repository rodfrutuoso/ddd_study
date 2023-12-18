import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface TeamProps {
  name: string;
  leaderId: UniqueEntityId;
  supervisorId?: UniqueEntityId;
  coordinatorId?: UniqueEntityId;
  type: string;
  contract: string;
  deactivation_date?: Date;
  created_at: Date;
}

export class Team extends Entity<TeamProps> {
  get name() {
    return this.props.name;
  }
  get leaderId() {
    return this.props.leaderId.value;
  }
  get supervisorId() {
    return this.props.supervisorId.value;
  }
  get coordinatorId() {
    return this.props.coordinatorId.value;
  }
  get type() {
    return this.props.type;
  }
  get contract() {
    return this.props.contract;
  }
  get deactivation_date() {
    return this.props.deactivation_date;
  }
  get created_at() {
    return this.props.created_at;
  }

  set name(name:string){
    this.props.name = name
  }
  set leaderId(leaderId:string){
    this.props.leaderId = leaderId
  }
  set supervisorId(supervisorId:string){
    this.props.supervisorId = supervisorId
  }
  set coordinatorId(coordinatorId:string){
    this.props.coordinatorId = coordinatorId
  }
  set deactivation_date(deactivation_date:Date){
    this.props.deactivation_date = new Date()
  }
  
  static create(props: Optinal<TeamProps, "created_at">, id?: UniqueEntityId) {
    const team = new Team(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return team;
  }
}
