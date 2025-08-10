import "@mantine/core/styles.css";

import { Stack } from "@mantine/core";

import { CartVegetableCard } from "../../components";

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
          <CartVegetableCard
            key={item.id}
            item={item}
            cart={cart}
            setCart={setCart}
          />
        );
      })}
    </Stack>
  );
};
