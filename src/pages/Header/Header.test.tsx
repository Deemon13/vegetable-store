import { screen } from "@testing-library/react";
import { Popover } from "@mantine/core";
import { expect, it, describe, vi, beforeEach } from "vitest";
import ky from "ky";

import { Logo, CartButton } from "../../modules/UI";
import { CartPopUp } from "../../modules/components";
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

describe("Header component", async function () {
  const mochSetCart = vi.fn();
  const mochSetTotal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getVegetables = async () => {
    const newVegetables: VegetableType[] = await ky.get(url).json();
    const newVegetablesWithAmount = newVegetables.map((itm) => {
      return { ...itm, amount: 1 };
    });

    return newVegetablesWithAmount;
  };

  const cart: VegetableType[] = await getVegetables();
  const total = 42;

  it("should render component Header", () => {
    render(
      <>
        <Logo />
        <Popover position="bottom-end" offset={20}>
          <CartButton cart={cart} />
          <CartPopUp
            cart={cart}
            setCart={mochSetCart}
            total={total}
            setTotal={mochSetTotal}
          />
        </Popover>
      </>
    );
    expect(screen.getByText(/Vegetable/i));
    expect(screen.getByText(/shop/i));
    expect(screen.getByText(`${cart.length}`));
  });
});
