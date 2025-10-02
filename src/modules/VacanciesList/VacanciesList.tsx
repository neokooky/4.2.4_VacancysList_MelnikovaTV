import { useDispatch, useSelector } from "react-redux";
import styles from "./VacanciesList.module.css";
import { Box } from "@mantine/core";
import type { RootState } from "../../store/store";
import {
  setLoading,
  setVacancies,
  setTotalPages,
  setSearchValue,
} from "../../store/vacanciesSlice";
import { useEffect, useState } from "react";
import { fetchVacancies } from "../../api/fetchVacancies";
import { getCityValue } from "../../helpers/getCityValue";
import { CityTabs } from "../../components/CityTabs/CityTabs";
import { useSearchParams } from "react-router-dom";

export const VacanciesList = () => {
  const { page, searchValue, skills, filtersInitialized } = useSelector(
    (state: RootState) => state.vacancies
  );

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [activeCity, setActiveCity] = useState(() => {
    const city = searchParams.get("city");
    if (city === "Москва" || city === "Санкт-Петербург") {
      return city;
    } else {
      return "Все";
    }
  });

  useEffect(() => {
    const queryParam = searchParams.get("query");

    if (queryParam !== searchValue) {
      dispatch(setSearchValue(queryParam));
    }
  }, [dispatch, searchParams, searchValue]);

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(setLoading(true));

      try {
        const cityValue = getCityValue(activeCity);

        const data = await fetchVacancies(page, searchValue, skills, cityValue);

        dispatch(setVacancies(data.items || []));
        dispatch(setTotalPages(data.pages || 0));
      } catch (error) {
        console.error("Ошибка загрузки вакансий: ", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (filtersInitialized) loadVacancies();
  }, [page, skills, searchValue, dispatch, filtersInitialized, activeCity]);

  return (
    <Box className={styles["vacancies-list"]}>
      <CityTabs activeCity={activeCity} setActiveCity={setActiveCity} />
    </Box>
  );
};
