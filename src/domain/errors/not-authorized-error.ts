import { UseCaseError } from "@/core/errors/use-case-error";

export class NotAuthorizedError extends Error implements UseCaseError {
  constructor() {
    super("Not Authorized");
  }
}
