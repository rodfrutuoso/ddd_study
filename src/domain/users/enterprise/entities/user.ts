/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface UserProps {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  deactivation_date?: Date;
  created_at: Date;
  created_by: UniqueEntityId;
  updated_at?: Date;
}

export abstract class User<Props extends UserProps> extends Entity<Props> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
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

  get type() {
    return this.props.type;
  }

  get deactivation_date(): Date | undefined {
    return this.props.deactivation_date;
  }

  set deactivation_date(_deactivation_date: Date | undefined) {
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

  protected touch() {
    this.props.updated_at = new Date();
  }
}
