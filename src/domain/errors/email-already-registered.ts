import { UseCaseError } from "@/core/errors/use-case-error";

export class EmailAlreadyRegistered extends Error implements UseCaseError {
  constructor() {
    super("O e-mail já está cadastrado");
  }
}
