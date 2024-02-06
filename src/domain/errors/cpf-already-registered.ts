import { UseCaseError } from "@/core/errors/use-case-error";

export class CpfAlreadyRegistered extends Error implements UseCaseError {
  constructor() {
    super("O CPF já está cadastrado");
  }
}
