export const VACANCIES_API_BASE_URL = "https://api.hh.ru/vacancies";

export const fetchVacancies = async (
  page: number,
  searchValue: string,
  skills: string[],
  selectedCity: string
) => {
  const url = new URL(VACANCIES_API_BASE_URL);

  url.searchParams.append("industry", "7");
  url.searchParams.append("professional_role", "96");

  url.searchParams.append("page", String(page - 1));
  url.searchParams.append("per_page", "10");

  const safeSearchValue = searchValue ? searchValue.trim() : "";
  const query = [safeSearchValue, ...(skills || [])].filter(Boolean);

  const hasSearch = query.length > 0;

  if (hasSearch) {
    url.searchParams.append("search_field", "name");
    url.searchParams.append("search_field", "company_name");
    url.searchParams.append("text", `${query.join(" OR ")}`);
  }

  if (selectedCity) {
    url.searchParams.append("area", selectedCity);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
