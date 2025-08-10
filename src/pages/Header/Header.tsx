import "@mantine/core/styles.css";

import { useEffect, type MouseEvent } from "react";
import { Popover, Button, Stack } from "@mantine/core";

import { IconShoppingCart } from "@tabler/icons-react";

import { Logo } from "../../modules/UI";

import { transformNameOfVegetable } from "../../modules/utils";

import styles from "./Header.module.css";

interface HeaderProps {
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
  total: number;
  setTotal: (total: number) => void;
}

export const Header = ({ cart, setCart, total, setTotal }: HeaderProps) => {
  useEffect(() => {
    createTotalCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function createTotalCart() {
    const totalValueOfVegetables = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);

    setTotal(totalValueOfVegetables);
  }

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
    <>
      <Logo />
      <Popover width={444} position="bottom-end" offset={20}>
        <Popover.Target>
          <Button
            variant="filled"
            color="#54b46a"
            rightSection={<IconShoppingCart size={20} />}
            className={styles["btn-cart"]}
          >
            {cart.length > 0 && (
              <span className={styles["veg-amount"]}>{cart.length}</span>
            )}
            Cart
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md"
          >
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <div key={item.id} id={String(item.id)}>
                    {transformNameOfVegetable(item.name).name}{" "}
                    {transformNameOfVegetable(item.name).weight} - {item.price}{" "}
                    $,{" "}
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
              })
            ) : (
              <div>cart is empty!</div>
            )}
            {total > 0 && <div>Total price: {total} $</div>}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};
