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
import {
  setPage,
  setSelectedCity,
  setSearchValue,
  setSkills,
  setLoading,
  setVacancies,
  setTotalPages,
} from "./store/vacanciesSlice";
import type { RootState } from "./store/store";

function App() {
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const dispatch = useDispatch();
  const {
    skills,
    selectedCity,
    searchValue,
    page,
    totalPages,
    vacancies,
    loading,
  } = useSelector((state: RootState) => state.vacancies);

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

      skills.forEach((skill: string) => {
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
      } catch (error) {
        console.error("Ошибка загрузки вакансий:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchVacancies();
    if (isSearchTriggered) {
      setIsSearchTriggered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, skills, selectedCity, isSearchTriggered]);

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
            <SearchForm
              searchValue={searchValue}
              setSearchValue={(value) => dispatch(setSearchValue(value))}
              onSearch={() => {
                dispatch(setPage(1));
                setIsSearchTriggered(true);
              }}
            />
          </Box>
        </Group>
        <Group justify="space-between" align="flex-start">
          <Filters
            skills={skills}
            setSkills={(skill) => {
              dispatch(setSkills(skill));
              dispatch(setPage(1));
            }}
            selectedCity={selectedCity}
            setSelectedCity={(city) => {
              dispatch(setSelectedCity(city));
              dispatch(setPage(1));
            }}
          />
          <VacanciesList
            loading={loading}
            vacancies={vacancies}
            totalPages={totalPages}
            setPage={(page) => dispatch(setPage(page))}
            page={page}
          />
        </Group>
      </Main>
    </>
  );
}

export default App;
