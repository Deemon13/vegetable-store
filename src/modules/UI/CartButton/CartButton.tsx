import "@mantine/core/styles.css";

import { Popover, Button } from "@mantine/core";

import WhiteCart from "../../../assets/white-cart.png";

import styles from "./CartButton.module.css";

interface CartButtonProps {
  cart: {
    id: number;
    name: string;
    price: number;
    image?: string;
    category?: string;
    amount: number;
  }[];
}

export const CartButton = ({ cart }: CartButtonProps) => {
  return (
    <Popover.Target>
      <Button variant="filled" color="#54b46a" className={styles["btn-cart"]}>
        {cart.length > 0 && (
          <span className={styles["veg-amount"]}>{cart.length}</span>
        )}
        Cart
        <img src={WhiteCart} width={20} className={styles["btn-cart-icon"]} />
      </Button>
    </Popover.Target>
  );
};
