import "@mantine/core/styles.css";

import { useEffect } from "react";
import { Popover } from "@mantine/core";

import { CartListOfVegetables } from "../../components";
import { EmptyCart, CartPopupTotal } from "../../UI";

import styles from "./CartPopUp.module.css";

interface CartPopUpProps {
  cart: {
    id: number;
    name: string;
    price: number;
    image?: string;
    category?: string;
    amount: number;
  }[];
  setCart: (
    obj: {
      id: number;
      name: string;
      price: number;
      image?: string;
      category?: string;
      amount: number;
    }[]
  ) => void;
  total: number;
  setTotal: (total: number) => void;
}

export const CartPopUp = ({
  cart,
  setCart,
  total,
  setTotal,
}: CartPopUpProps) => {
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

  return (
    <Popover.Dropdown className={styles.popup}>
      {cart.length > 0 ? (
        <CartListOfVegetables cart={cart} setCart={setCart} />
      ) : (
        <EmptyCart />
      )}
      {total > 0 && <CartPopupTotal total={total} />}
    </Popover.Dropdown>
  );
};
