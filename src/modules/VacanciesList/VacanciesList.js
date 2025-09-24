import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";
import styles from "./VacanciesList.module.css";
import { Box, Flex, Pagination } from "@mantine/core";
import { setPage, setLoading, setVacancies, setTotalPages, } from "../../store/vacanciesSlice";
import { useEffect } from "react";
import { fetchVacancies } from "../../api/fetchVacancies";
export const VacanciesList = () => {
    const { loading, vacancies, totalPages, page, searchValue, skills, selectedCity, } = useSelector((state) => state.vacancies);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadVacancies = async () => {
            dispatch(setLoading(true));
            try {
                const data = await fetchVacancies(page, searchValue, skills, selectedCity);
                dispatch(setVacancies(data.items || []));
                dispatch(setTotalPages(data.pages || 0));
            }
            catch (error) {
                console.error("Ошибка загрузки вакансий: ", error);
            }
            finally {
                dispatch(setLoading(false));
            }
        };
        loadVacancies();
    }, [page, skills, selectedCity, searchValue, dispatch]);
    return (_jsx(_Fragment, { children: _jsxs(Box, { className: styles.vacanciesList, children: [loading && (_jsx(Flex, { justify: "center", mt: "md", mb: 24, children: _jsx(Box, { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439..." }) })), vacancies.length === 0 && !loading ? (_jsx(Box, { children: "\u041D\u0435\u0442 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0439" })) : (vacancies.map((vacancy) => {
                    const workFormats = vacancy.work_format || [];
                    const format = workFormats.some((f) => f.id === "HYBRID")
                        ? { id: "HYBRID", name: "Гибрид" }
                        : workFormats.some((f) => f.id === "REMOTE")
                            ? { id: "REMOTE", name: "Можно удалённо" }
                            : workFormats.some((f) => f.id === "ON_SITE")
                                ? { id: "ON_SITE", name: "Офис" }
                                : null;
                    return (_jsx(VacancyCard, { mainUrl: vacancy.alternate_url, title: vacancy.name, company: vacancy.employer?.name || "Не указано", salary: vacancy.salary
                            ? `${vacancy.salary.from ? vacancy.salary.from : ""}${vacancy.salary.to ? ` - ${vacancy.salary.to}` : ""} ${vacancy.salary.currency}`
                            : "Не указана", city: vacancy.area?.name || null, experience: vacancy.experience?.name || "", formatId: format?.id || null, formatLabel: format?.name || null }, vacancy.id));
                })), _jsx(Flex, { justify: "center", mt: "md", mb: 24, children: totalPages > 1 && (_jsx(Pagination, { total: totalPages, value: page, onChange: (newPage) => {
                            dispatch(setPage(newPage));
                            window.scrollTo(0, 0);
                        } })) })] }) }));
};
