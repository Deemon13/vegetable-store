import "@mantine/core/styles.css";

import { type MouseEvent } from "react";
import { Button } from "@mantine/core";

import { transformNameOfVegetable } from "../../../modules/utils";

import IconDecrease from "../../../assets/Rectangle 70.png";
import IconIncrease from "../../../assets/Union.png";

import styles from "./CartVegetableCard.module.css";

interface CartVegetableCardProps {
  cart: {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    amount: number;
  }[];
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    amount: number;
  };
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

export const CartVegetableCard = ({
  cart,
  item,
  setCart,
}: CartVegetableCardProps) => {
  function handleIncreaseAmountCart(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if ((evt.target as Element).nodeName !== "BUTTON") {
      return;
    }

    const vegetablesWithIncreaseAmount = cart.map((item) => {
      if (item.id !== Number((evt.target as HTMLElement).offsetParent?.id)) {
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
      if (item.id !== Number((evt.target as HTMLElement).offsetParent?.id)) {
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
    <div id={String(item.id)} className={styles["cart-vegetable-card"]}>
      <img src={item.image} width="64" height="64" />
      <div className={styles["cart-vegetable-card-data"]}>
        <div className={styles["cart-vegetable-card-info"]}>
          <div className={styles["cart-vegetable-card-descr"]}>
            <span>{transformNameOfVegetable(item.name, "-").name}</span>
            <span>{transformNameOfVegetable(item.name, "-").weight}</span>
          </div>
          <div className={styles["cart-vegetable-card-price"]}>
            $ {item.price}
          </div>
        </div>
        <div className={styles["cart-vegetable-card-actions"]}>
          <Button
            variant="filled"
            color="gray"
            size="xs"
            radius="md"
            onClick={handleDecreaseAmountCart}
            className={styles["btn-decrease-amount-cart"]}
          >
            <img src={IconDecrease} width={10} />
          </Button>
          <span className={styles["cart-vegetable-amount"]}>{item.amount}</span>
          <Button
            variant="filled"
            color="gray"
            size="xs"
            radius="md"
            onClick={handleIncreaseAmountCart}
            className={styles["btn-increase-amount-cart"]}
          >
            <img src={IconIncrease} width={10} />
          </Button>
        </div>
      </div>
    </div>
  );
};
