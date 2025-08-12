import styles from "./CatalogTitle.module.css";

interface CatalogTitleProps {
  title: string;
}

export const CatalogTitle = ({ title }: CatalogTitleProps) => {
  return <h1 className={styles["main-title"]}>{title}</h1>;
};
