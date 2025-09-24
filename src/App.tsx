import { Header } from "./modules/Header/Header";
import logo from "./images/logo.svg";
import styles from "./App.module.css";
import { Main } from "./modules/Main/Main";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { Box, Group } from "@mantine/core";
import Filters from "./components/Filters/Filters";
import { VacanciesList } from "./modules/VacanciesList/VacanciesList";

function App() {
  return (
    <>
      <Header>
        <Group className={styles["header-nav"]}>
          <Header.Logo src={logo} alt="Логотип" href="/" />
          <Header.Link className={styles["header-link"]} href="/">
            Вакансии FE
          </Header.Link>
        </Group>
        <Group className={styles["header-about"]}>
          <Header.Link className={styles["header-link-about"]} href="/">
            Обо мне
          </Header.Link>
        </Group>
      </Header>
      <Main>
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
      </Main>
    </>
  );
}

export default App;
