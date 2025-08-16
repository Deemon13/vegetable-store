import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { CartPopupTotal } from "./CartPopupTotal";

describe("CartPopupTotal component", function () {
  it("should render component CartPopupTotal with prop total", () => {
    const total = 42;

    render(<CartPopupTotal total={total} />);
    expect(screen.getByText(/Total/i));
    expect(screen.getByText(`$ ${total}`));
  });
});
