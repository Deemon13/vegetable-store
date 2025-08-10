import "@mantine/core/styles.css";

import { type MouseEvent } from "react";
import { Button, Stack } from "@mantine/core";

import { transformNameOfVegetable } from "../../../modules/utils";

interface CartListOfVegetablesProps {
  cart: {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    amount: number;
  }[];
  setCart: (
    obj: {
      id: number;
      name: string;
      price: number;
      image: string;
      category?: string;
      amount: number;
    }[]
  ) => void;
}

export const CartListOfVegetables = ({
  cart,
  setCart,
}: CartListOfVegetablesProps) => {
  function handleIncreaseAmountCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if ((evt.target as Element).nodeName !== "BUTTON") {
      return;
    }

    const vegetablesWithIncreaseAmount = cart.map((item) => {
      if (item.id !== Number((evt.target as Element).parentElement?.id)) {
        return item;
      } else {
        item.amount += 1;
        return item;
      }
    });

    setCart([...vegetablesWithIncreaseAmount]);
  }

  function handleDecreaseAmountCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if ((evt.target as Element).nodeName !== "BUTTON") {
      return;
    }

    const vegetablesWithIncreaseAmount = cart.map((item) => {
      if (item.id !== Number((evt.target as Element).parentElement?.id)) {
        return item;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.amount <= 0 ? (item.amount = 0) : (item.amount -= 1);
        return item;
      }
    });

    setCart([...vegetablesWithIncreaseAmount]);
  }
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="top"
      gap="md"
    >
      {cart.map((item) => {
        return (
          <div key={item.id} id={String(item.id)}>
            {transformNameOfVegetable(item.name).name}{" "}
            {transformNameOfVegetable(item.name).weight} - {item.price} $,{" "}
            <Button
              variant="filled"
              color="gray"
              size="xs"
              radius="md"
              onClick={handleDecreaseAmountCart}
              className="btn-decrease-amount-cart"
            >
              -
            </Button>
            {item.amount}
            <Button
              variant="filled"
              color="gray"
              size="xs"
              radius="md"
              onClick={handleIncreaseAmountCart}
              className="btn-increase-amount-cart"
            >
              +
            </Button>
          </div>
        );
      })}
    </Stack>
  );
};
