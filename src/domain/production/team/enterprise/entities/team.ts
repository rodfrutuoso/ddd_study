/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { UserNameId } from "@/core/entities/userNameId";

export interface TeamProps {
  name: string;
  leaderId: UserNameId;
  supervisorId: UserNameId;
  coordinatorId: UserNameId;
  type: string;
  contract: string;
  deactivation_date?: Date;
  created_at: Date;
}

export class Team extends Entity<TeamProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get leaderId() {
    return this.props.leaderId;
  }

  set leaderId(leaderId: UserNameId) {
    this.props.leaderId = leaderId;
  }

  get supervisorId(): UserNameId {
    return this.props.supervisorId;
  }

  set supervisorId(supervisorId: UserNameId) {
    this.props.supervisorId = supervisorId;
  }

  get coordinatorId(): UserNameId {
    return this.props.coordinatorId;
  }

  set coordinatorId(coordinatorId: UserNameId) {
    this.props.coordinatorId = coordinatorId;
  }

  get type() {
    return this.props.type;
  }

  get contract() {
    return this.props.contract;
  }

  get deactivation_date(): Date | undefined {
    return this.props.deactivation_date;
  }

  set deactivation_date(deactivation_date: Date) {
    this.props.deactivation_date = new Date();
  }

  get created_at() {
    return this.props.created_at;
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
