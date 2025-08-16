import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { CatalogTitle } from "./CatalogTitle";

describe("CatalogTitle component", function () {
  it("should render component CatalogTitle with prop title", () => {
    render(<CatalogTitle title={"Catalog"} />);
    expect(screen.getByText(/Catalog/i));
  });
});
