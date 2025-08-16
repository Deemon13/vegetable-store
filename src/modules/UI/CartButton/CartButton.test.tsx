import { render, screen } from "@testing-library/react";
import { MantineProvider, Popover } from "@mantine/core";
import { expect, it, describe } from "vitest";
import ky from "ky";

import { CartButton } from "./CartButton";

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

describe("CartButton component", function () {
  it("should render component CartButton", async () => {
    const getVegetables = async () => {
      const newVegetables: VegetableType[] = await ky.get(url).json();
      const newVegetablesWithAmount = newVegetables.map((itm) => {
        return { ...itm, amount: 1 };
      });

      return newVegetablesWithAmount;
    };

    const cart: VegetableType[] = await getVegetables();

    render(
      <MantineProvider>
        <Popover>
          <CartButton cart={cart} />
        </Popover>
      </MantineProvider>
    );
    expect(screen.getByText(`${cart.length}`));
  });
});
