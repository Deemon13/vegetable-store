import "@mantine/core/styles.css";

import { Popover, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

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
  );
};
