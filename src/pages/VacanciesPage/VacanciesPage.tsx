import { Group, Box } from "@mantine/core";
import Filters from "../../components/Filters/Filters";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import styles from "./VacanciesPage.module.css";
import { VacanciesList } from "../../modules/VacanciesList/VacanciesList";

export const VacanciesPage = () => {
  return (
    <div className={styles.main}>
      <Group className={styles["main-search"]} justify="space-between">
        <Box>
          <h1>Список вакансий</h1>
          <h2>по профессии Frontend-разработчик</h2>
        </Box>
        <Box>
          <SearchForm />
        </Box>
      </Group>
      <Group justify="space-between" align="flex-start">
        <Filters />
        <VacanciesList />
      </Group>
    </div>
  );
};
