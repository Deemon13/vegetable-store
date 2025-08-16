import { expect, it, describe } from "vitest";

import { transformNameOfVegetable } from "./transform-name";

describe("transformNameOfVegetable should return object of transformed names", function () {
  it("expect object of two keys/values", () => {
    const nametoTransform = "jksdbf - jksadgbfjk";
    const result = transformNameOfVegetable(nametoTransform, "-");

    expect(Object.keys(result)).toHaveLength(2);
    expect(result.name).toBe("jksdbf");
    expect(result.weight).toBe("jksadgbfjk");
  });
});
