import { VacancyCard } from "../../components/VacancyCard/VacancyCard";
import styles from "./VacanciesList.module.css";
import { Box, Flex, Pagination } from "@mantine/core";

export type VacancyItem = {
  id: string;
  name: string;
  alternate_url: string;
  salary?: {
    from?: number | null;
    to?: number | null;
    currency: string;
  } | null;
  area?: {
    name: string;
  } | null;
  employer?: {
    name: string;
  } | null;
  experience?: {
    name: string;
  } | null;
  work_format?: Array<{ id: string; name: string }> | null;
};

type VacanciesListProps = {
  vacancies: Array<VacancyItem>;
  totalPages: number;
  setPage: (page: number) => void;
  loading: boolean;
  page: number;
};

export const VacanciesList = ({
  vacancies,
  totalPages,
  setPage,
  loading,
  page,
}: VacanciesListProps) => {
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
              <VacancyCard
                mainUrl={vacancy.alternate_url}
                key={vacancy.id}
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
              />
            );
          })
        )}

        <Flex justify="center" mt="md" mb={24}>
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={page}
              onChange={(newPage) => setPage(newPage)}
            />
          )}
        </Flex>
      </Box>
    </>
  );
};
