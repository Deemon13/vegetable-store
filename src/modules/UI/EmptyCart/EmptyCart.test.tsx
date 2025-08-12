import { render, screen } from "@testing-library/react";
import { EmptyCart } from "./EmptyCart";
import { expect, it, describe } from "vitest";

describe("EmptyCart component", function () {
  it("should render component EmptyCart", () => {
    render(<EmptyCart />);
    expect(screen.getByText(/You cart is empty!/i));
    expect(screen.getByRole("img"));
    expect(screen.getByAltText("empty-cart"));
  });
});
