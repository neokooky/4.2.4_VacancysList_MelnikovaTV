import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Main.module.css";
export const Main = ({ children }) => {
    return _jsx("div", { className: styles.main, children: children });
};
