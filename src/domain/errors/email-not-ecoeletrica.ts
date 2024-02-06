import { UseCaseError } from "@/core/errors/use-case-error";

export class EmailNotEcoeletrica extends Error implements UseCaseError {
  constructor() {
    super("O e-mail precisa ser do domínio da Ecoelétrica");
  }
}
