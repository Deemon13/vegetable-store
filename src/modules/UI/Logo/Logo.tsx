import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles["logo-bg"]}>
      <span className={styles["logo__first-word"]}>Vegetable</span>
      <span className={styles["logo__last-word"]}>shop</span>
    </div>
  );
};
