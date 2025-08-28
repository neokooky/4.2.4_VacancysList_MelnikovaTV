import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Header.module.css";
export const Header = ({ children }) => {
    return (_jsx("div", { children: _jsx("header", { className: styles.header, children: children }) }));
};
Header.Logo = ({ href, src, alt, }) => (_jsx("a", { href: href || "/", children: _jsx("img", { src: src, alt: alt || "Logo", style: { height: 30 } }) }));
Header.Link = ({ href, children, className }) => (_jsx("a", { href: href, className: className, children: children }));
