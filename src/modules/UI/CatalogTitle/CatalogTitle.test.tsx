import { render, screen } from "@testing-library/react";
import { CatalogTitle } from "./CatalogTitle";
import { expect, it, describe } from "vitest";

describe("CatalogTitle component", function () {
  it("should render component CatalogTitle with prop title", () => {
    render(<CatalogTitle title={"Catalog"} />);
    expect(screen.getByText(/Catalog/i));
  });
});
