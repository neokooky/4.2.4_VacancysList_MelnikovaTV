import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Flex, Box, Pagination } from "@mantine/core";
import { setPage } from "../../store/vacanciesSlice";
import { VacancyCard } from "../VacancyCard/VacancyCard";
import styles from "./Vacancies.module.css";

export const Vacancies = () => {
  const { loading, vacancies, totalPages, page } = useSelector(
    (state: RootState) => state.vacancies
  );

  const dispatch = useDispatch();

  if (loading) {
    return (
      <Flex justify="center" mt="md" mb={24}>
        <Box>Загрузка вакансий...</Box>
      </Flex>
    );
  }

  if (vacancies.length === 0 && !loading) {
    return <Box>Нет вакансий</Box>;
  }

  return (
    <>
      {vacancies.map((vacancy) => {
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
      })}
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
    </>
  );
};
