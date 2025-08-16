import { screen } from "@testing-library/react";
import { expect, it, describe, vi, beforeEach } from "vitest";
import ky from "ky";

import { App } from "../index";
import { VegetablesList } from "../../pages";
import { render } from "../../modules/test-utils/render";

const url =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

interface VegetableType {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  amount: number;
}

describe("App component", async function () {
  const mochSetVegetables = vi.fn();
  const mochSetCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render component App", () => {
    render(<App></App>);
    expect(screen.getByText(/shop/i));
    expect(screen.getByText(/Cart/i));
    expect(screen.getByText(/Catalog/i));
    expect(screen.getByText(/Loading vegetables...Please Wait!/i));
  });

  it("should render component App with list of vegetables", async () => {
    const getVegetables = async () => {
      const newVegetables: VegetableType[] = await ky.get(url).json();
      const newVegetablesWithAmount = newVegetables.map((itm) => {
        return { ...itm, amount: 1 };
      });

      return newVegetablesWithAmount;
    };

    const vegetables: VegetableType[] = await getVegetables();
    const cart: VegetableType[] = await getVegetables();

    render(
      <VegetablesList
        vegetables={vegetables}
        cart={cart}
        setVegetables={mochSetVegetables}
        setCart={mochSetCart}
      />
    );

    render(<App></App>);
    expect(screen.getByText(/shop/i));
    expect(screen.getByText(/Catalog/i));
    expect(screen.getAllByAltText("btn-cart-icon"));
  });
});
