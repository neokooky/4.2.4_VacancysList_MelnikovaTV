import { Header } from "./modules/Header/Header";
import logo from "./images/logo.svg";
import styles from "./App.module.css";
import { Group } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import { VacanciesPage } from "./pages/VacanciesPage/VacanciesPage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { NotFound } from "./pages/NotFound/NotFound";

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
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
