import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { Logo } from "./Logo";

describe("Logo component", function () {
  it("should render Logo", () => {
    render(<Logo />);
    expect(screen.getByText(/Vegetable/i));
    expect(screen.getByText(/shop/i));
  });
});
