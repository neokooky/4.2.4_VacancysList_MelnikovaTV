import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Header } from "./modules/Header/Header";
import logo from "./images/logo.svg";
import styles from "./App.module.css";
import { Main } from "./modules/Main/Main";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { Box, Group } from "@mantine/core";
import { Filters } from "./components/Filters/Filters";
import { VacanciesList } from "./modules/VacanciesList/VacanciesList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSelectedCity, setSearchValue, setSkills, setLoading, setVacancies, setTotalPages, } from "./store/vacanciesSlice";
function App() {
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const dispatch = useDispatch();
    const { skills, selectedCity, searchValue, page, totalPages, vacancies, loading, } = useSelector((state) => state.vacancies);
    useEffect(() => {
        const fetchVacancies = async () => {
            const url = new URL("https://api.hh.ru/vacancies");
            url.searchParams.append("industry", "7");
            url.searchParams.append("professional_role", "96");
            url.searchParams.append("page", String(page - 1));
            url.searchParams.append("per_page", "10");
            if (searchValue.trim().length > 0) {
                url.searchParams.append("search_field", "name");
                url.searchParams.append("search_field", "company_name");
                url.searchParams.append("text", searchValue.trim());
            }
            skills.forEach((skill) => {
                url.searchParams.append("skill_set", skill);
            });
            if (selectedCity) {
                url.searchParams.append("area", selectedCity);
            }
            dispatch(setLoading(true));
            try {
                const response = await fetch(url.toString());
                const data = await response.json();
                dispatch(setVacancies(data.items || []));
                dispatch(setTotalPages(data.pages));
                console.log("теперь количество страниц: ", data.pages);
            }
            catch (error) {
                console.error("Ошибка загрузки вакансий:", error);
            }
            finally {
                dispatch(setLoading(false));
            }
        };
        fetchVacancies();
        if (isSearchTriggered) {
            setIsSearchTriggered(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, skills, selectedCity, isSearchTriggered]);
    return (_jsxs(_Fragment, { children: [_jsxs(Header, { children: [_jsxs(Group, { className: styles["header-nav"], children: [_jsx(Header.Logo, { src: logo, alt: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F", href: "/" }), _jsx(Header.Link, { className: styles["header-link"], href: "/", children: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438 FE" })] }), _jsx(Group, { className: styles["header-about"], children: _jsx(Header.Link, { className: styles["header-link-about"], href: "/", children: "\u041E\u0431\u043E \u043C\u043D\u0435" }) })] }), _jsxs(Main, { children: [_jsxs(Group, { className: styles["main-search"], justify: "space-between", children: [_jsxs(Box, { children: [_jsx("h1", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439" }), _jsx("h2", { children: "\u043F\u043E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u0438 Frontend-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A" })] }), _jsx(Box, { children: _jsx(SearchForm, { searchValue: searchValue, setSearchValue: (value) => dispatch(setSearchValue(value)), onSearch: () => {
                                        dispatch(setPage(1));
                                        setIsSearchTriggered(true);
                                    } }) })] }), _jsxs(Group, { justify: "space-between", align: "flex-start", children: [_jsx(Filters, { skills: skills, setSkills: (skill) => {
                                    dispatch(setSkills(skill));
                                    dispatch(setPage(1));
                                }, selectedCity: selectedCity, setSelectedCity: (city) => {
                                    dispatch(setSelectedCity(city));
                                    dispatch(setPage(1));
                                } }), _jsx(VacanciesList, { loading: loading, vacancies: vacancies, totalPages: totalPages, setPage: (page) => dispatch(setPage(page)), page: page })] })] })] }));
}
export default App;
