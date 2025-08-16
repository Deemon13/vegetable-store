import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { Loader } from "./Loader";

describe("Loader component", function () {
  it("should render component Loader", () => {
    render(<Loader />);
    expect(screen.getByText(/Loading vegetables...Please Wait!/i));
  });
});
