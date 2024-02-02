import { UseCaseError } from "@/core/errors/use-case-error";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(value?: string) {
    if (value) super(value);
    else super("Resource not found");
  }
}
