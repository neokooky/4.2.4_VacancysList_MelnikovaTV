import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Header } from "./modules/Header/Header";
import logo from "./images/logo.svg";
import styles from "./App.module.css";
import { Main } from "./modules/Main/Main";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { Box, Group } from "@mantine/core";
import Filters from "./components/Filters/Filters";
import { VacanciesList } from "./modules/VacanciesList/VacanciesList";
function App() {
    return (_jsxs(_Fragment, { children: [_jsxs(Header, { children: [_jsxs(Group, { className: styles["header-nav"], children: [_jsx(Header.Logo, { src: logo, alt: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F", href: "/" }), _jsx(Header.Link, { className: styles["header-link"], href: "/", children: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438 FE" })] }), _jsx(Group, { className: styles["header-about"], children: _jsx(Header.Link, { className: styles["header-link-about"], href: "/", children: "\u041E\u0431\u043E \u043C\u043D\u0435" }) })] }), _jsxs(Main, { children: [_jsxs(Group, { className: styles["main-search"], justify: "space-between", children: [_jsxs(Box, { children: [_jsx("h1", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439" }), _jsx("h2", { children: "\u043F\u043E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u0438 Frontend-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A" })] }), _jsx(Box, { children: _jsx(SearchForm, {}) })] }), _jsxs(Group, { justify: "space-between", align: "flex-start", children: [_jsx(Filters, {}), _jsx(VacanciesList, {})] })] })] }));
}
export default App;
