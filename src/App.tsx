import { Header } from "./modules/Header/Header";
import logo from "./images/logo.svg";
import styles from "./App.module.css";
import { Group } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { VacanciesPage } from "./pages/VacanciesPage/VacanciesPage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";

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
      <Routes>
        <Route path="/" element={<VacanciesPage />}></Route>
        <Route path="/vacancies/:id" element={<VacancyPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
