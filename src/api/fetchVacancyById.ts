import { VACANCIES_API_BASE_URL } from "./fetchVacancies";

export const fetchVacancyById = async (id: string) => {
  const url = new URL(VACANCIES_API_BASE_URL);

  const response = await fetch(`${url.toString()}/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
