import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./VacancyCard.module.css";
import { Button, Flex, Group, Badge } from "@mantine/core";
export const VacancyCard = ({ title, salary, city, company, experience, mainUrl, formatId, formatLabel, }) => {
    return (_jsxs("div", { className: styles.vacancyCard, children: [_jsx("h3", { className: styles.title, children: title }), _jsxs(Flex, { align: "center", gap: "xs", mb: 16, children: [_jsx("p", { className: styles.salary, children: salary }), _jsx("span", { className: styles.experience, children: experience })] }), _jsx("p", { className: styles.company, children: company }), formatLabel && (_jsx(Badge, { radius: "xs", mb: 4, color: formatId === "REMOTE"
                    ? "rgba(66, 99, 235, 1)"
                    : formatId === "HYBRID"
                        ? "rgba(0, 0, 0)"
                        : "rgba(15, 15, 16, 0.1)", variant: formatId === "ON_SITE" ? "light" : "filled", children: formatLabel })), _jsx("p", { children: city }), _jsxs(Group, { className: styles.buttons, children: [_jsx(Button, { color: "dark", variant: "filled", children: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u044E" }), _jsx("a", { href: mainUrl, target: "_blank", children: _jsx(Button, { color: "gray", variant: "light", children: "\u041E\u0442\u043A\u043B\u0438\u043A\u043D\u0443\u0442\u044C\u0441\u044F" }) })] })] }));
};
