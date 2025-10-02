import { Navigate, Route, Routes } from "react-router-dom";
import { VacanciesPage } from "./pages/VacanciesPage/VacanciesPage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { NotFound } from "./pages/NotFound/NotFound";
import { AboutMe } from "./pages/AboutMe/AboutMe";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="vacancies/:id" element={<VacancyPage />}></Route>
          <Route path="aboutme" element={<AboutMe />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
