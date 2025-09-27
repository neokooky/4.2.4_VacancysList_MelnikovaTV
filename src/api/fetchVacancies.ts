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

  if (searchValue.trim().length > 0 || skills.length > 0) {
    const query = [searchValue.trim(), ...(skills || [])].filter(Boolean);
    url.searchParams.append("search_field", "name");
    url.searchParams.append("search_field", "company_name");
    url.searchParams.append("text", `${query.join(" OR ")}`);
  }

  if (selectedCity) {
    url.searchParams.append("area", selectedCity);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
