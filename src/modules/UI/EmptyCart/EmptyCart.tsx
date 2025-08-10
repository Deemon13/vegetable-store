import EmptyCartImg from "../../../assets/cart_empty.png";

import styles from "./EmptyCart.module.css";

export const EmptyCart = () => {
  return (
    <>
      <img
        src={EmptyCartImg}
        alt="empty-cart"
        width="118"
        height="106"
        className={styles["empty-cart__img"]}
      />
      <p className={styles["empty-cart__text"]}>You cart is empty!</p>
    </>
  );
};
