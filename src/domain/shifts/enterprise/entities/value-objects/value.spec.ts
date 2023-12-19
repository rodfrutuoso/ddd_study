import { expect, test } from "vitest";
import { Value } from "./value";

test("should be able to convert a negative number to a positive number", () => {
  let value = Value.verifyNumberIsNotNegative(-1.321);

  expect(value.number).toEqual(1.321);

  value = Value.verifyNumberIsNotNegative(1.321);

  expect(value.number).toEqual(1.321);
});
