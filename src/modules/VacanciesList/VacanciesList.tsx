import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";
import styles from "./VacanciesList.module.css";
import { Box, Flex, Pagination } from "@mantine/core";
import type { RootState } from "../../store/store";
import {
  setPage,
  setLoading,
  setVacancies,
  setTotalPages,
} from "../../store/vacanciesSlice";
import { useEffect } from "react";
import { fetchVacancies } from "../../api/fetchVacancies";

export const VacanciesList = () => {
  const {
    loading,
    vacancies,
    totalPages,
    page,
    searchValue,
    skills,
    selectedCity,
    filtersInitialized,
  } = useSelector((state: RootState) => state.vacancies);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchVacancies(
          page,
          searchValue,
          skills,
          selectedCity
        );

        dispatch(setVacancies(data.items || []));
        dispatch(setTotalPages(data.pages || 0));
      } catch (error) {
        console.error("Ошибка загрузки вакансий: ", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (filtersInitialized) loadVacancies();
  }, [page, skills, selectedCity, searchValue, dispatch, filtersInitialized]);

  return (
    <>
      <Box className={styles.vacanciesList}>
        {loading && (
          <Flex justify="center" mt="md" mb={24}>
            <Box>Загрузка вакансий...</Box>
          </Flex>
        )}
        {vacancies.length === 0 && !loading ? (
          <Box>Нет вакансий</Box>
        ) : (
          vacancies.map((vacancy) => {
            const workFormats = vacancy.work_format || [];

            const format = workFormats.some((f) => f.id === "HYBRID")
              ? { id: "HYBRID", name: "Гибрид" }
              : workFormats.some((f) => f.id === "REMOTE")
              ? { id: "REMOTE", name: "Можно удалённо" }
              : workFormats.some((f) => f.id === "ON_SITE")
              ? { id: "ON_SITE", name: "Офис" }
              : null;
            return (
              <div key={vacancy.id} className={styles.vacancyCardWrapper}>
                <VacancyCard
                  mainUrl={vacancy.alternate_url}
                  title={vacancy.name}
                  company={vacancy.employer?.name || "Не указано"}
                  salary={
                    vacancy.salary
                      ? `${vacancy.salary.from ? vacancy.salary.from : ""}${
                          vacancy.salary.to ? ` - ${vacancy.salary.to}` : ""
                        } ${vacancy.salary.currency}`
                      : "Не указана"
                  }
                  city={vacancy.area?.name || null}
                  experience={vacancy.experience?.name || ""}
                  formatId={format?.id || null}
                  formatLabel={format?.name || null}
                  id={vacancy.id}
                />
              </div>
            );
          })
        )}
        <Flex justify="center" mt="md" mb={24}>
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={page}
              onChange={(newPage) => {
                dispatch(setPage(newPage));
                window.scrollTo(0, 0);
              }}
            />
          )}
        </Flex>
      </Box>
    </>
  );
};
