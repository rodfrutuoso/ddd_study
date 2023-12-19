/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface TeamLeaderProps {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  teamId: UniqueEntityId;
  type: string;
  deactivation_date?: Date;
  created_at: Date;
  created_by: UniqueEntityId;
  updated_at?: Date;
}

export class TeamLeader extends Entity<TeamLeaderProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get teamId() {
    return this.props.teamId;
  }

  set teamId(teamId: UniqueEntityId) {
    this.props.teamId = teamId;
    this.touch();
  }

  get type() {
    return this.props.type;
  }

  get deactivation_date(): Date | undefined {
    return this.props.deactivation_date;
  }

  set deactivation_date(_deactivation_date: Date) {
    this.props.deactivation_date = new Date();
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }

  get created_by() {
    return this.props.created_by;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  static create(
    props: Optinal<TeamLeaderProps, "created_at">,
    id?: UniqueEntityId,
  ) {
    const teamLeader = new TeamLeader(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    );

    return teamLeader;
  }
}
