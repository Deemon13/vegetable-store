import { screen } from "@testing-library/react";
import { Popover } from "@mantine/core";
import { expect, it, describe } from "vitest";
import ky from "ky";

import { CartButton } from "./CartButton";
import { render } from "../../test-utils/render";

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

describe("CartButton component", async function () {
  const getVegetables = async () => {
    const newVegetables: VegetableType[] = await ky.get(url).json();
    const newVegetablesWithAmount = newVegetables.map((itm) => {
      return { ...itm, amount: 1 };
    });

    return newVegetablesWithAmount;
  };

  const cart: VegetableType[] = await getVegetables();

  it("should render component CartButton", () => {
    render(
      <Popover>
        <CartButton cart={cart} />
      </Popover>
    );
    expect(screen.getByText(`${cart.length}`));
  });
});
