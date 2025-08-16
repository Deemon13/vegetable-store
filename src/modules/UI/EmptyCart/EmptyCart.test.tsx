import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { EmptyCart } from "./EmptyCart";

describe("EmptyCart component", function () {
  it("should render component EmptyCart", () => {
    render(<EmptyCart />);
    expect(screen.getByText(/You cart is empty!/i));
    expect(screen.getByRole("img"));
    expect(screen.getByAltText("empty-cart"));
  });
});
