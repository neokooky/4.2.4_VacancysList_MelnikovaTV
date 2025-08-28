import type { ReactNode } from "react";
import styles from "./Main.module.css";

export const Main = ({ children }: { children: ReactNode }) => {
  return <div className={styles.main}>{children}</div>;
};
