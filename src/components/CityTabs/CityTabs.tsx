import { Tabs } from "@mantine/core";
import { getCityValue } from "../../helpers/getCityValue";
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../store/vacanciesSlice";
import { Vacancies } from "../Vacancies/Vacancies";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type TabProps = {
  activeCity: string;
  setActiveCity: (value: string) => void;
};

export const CityTabs = ({ activeCity, setActiveCity }: TabProps) => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (activeCity !== "Все") {
        params.set("city", activeCity);
      } else {
        params.delete("city");
      }

      return params;
    });
  }, [activeCity, setSearchParams]);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    const cityValue = getCityValue(cityParam);
    dispatch(setSelectedCity(cityValue));
  }, [dispatch, searchParams]);

  const handleChange = (value: string | null) => {
    if (value === null) {
      value = "Все";
    }

    const cityValue = getCityValue(value);

    dispatch(setSelectedCity(cityValue));
    setActiveCity(value);
  };

  return (
    <Tabs value={activeCity} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab value="Все">Все</Tabs.Tab>
        <Tabs.Tab value="Санкт-Петербург">Санкт-Петербург</Tabs.Tab>
        <Tabs.Tab value="Москва">Москва</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Все">
        <Vacancies />
      </Tabs.Panel>
      <Tabs.Panel value="Санкт-Петербург">
        <Vacancies />
      </Tabs.Panel>
      <Tabs.Panel value="Москва">
        <Vacancies />
      </Tabs.Panel>
    </Tabs>
  );
};
