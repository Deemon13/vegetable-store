import styles from "./CartPopupTotal.module.css";

interface CartPopupTotalProps {
  total: number;
}

export const CartPopupTotal = ({ total }: CartPopupTotalProps) => {
  return (
    <div className={styles.total}>
      <span>Total</span> <span>$ {total}</span>
    </div>
  );
};
