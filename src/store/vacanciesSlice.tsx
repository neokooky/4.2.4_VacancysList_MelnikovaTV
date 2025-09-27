import { createSlice } from "@reduxjs/toolkit";

type VacancyItem = {
  id: string;
  name: string;
  alternate_url: string;
  salary?: {
    from?: number | null;
    to?: number | null;
    currency: string;
  } | null;
  area?: {
    name: string;
  } | null;
  employer?: {
    name: string;
  } | null;
  experience?: {
    name: string;
  } | null;
  work_format?: Array<{ id: string; name: string }> | null;
  description?: string;
};

type VacancyState = {
  vacancies: VacancyItem[];
  page: number;
  totalPages: number;
  loading: boolean;
  skills: Array<string>;
  selectedCity: string;
  searchValue: string;
  filtersInitialized: boolean;
};

const initialState: VacancyState = {
  vacancies: [],
  page: 1,
  totalPages: 0,
  loading: false,
  skills: ["TypeScript", "React", "Redux"],
  selectedCity: "",
  searchValue: "",
  filtersInitialized: false,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setVacancies: (state, action) => {
      state.vacancies = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setFiltersInitialized: (state) => {
      state.filtersInitialized = true;
    },
  },
});

export default vacanciesSlice.reducer;
export const {
  setLoading,
  setPage,
  setSelectedCity,
  setTotalPages,
  setSearchValue,
  setVacancies,
  setSkills,
  setFiltersInitialized,
} = vacanciesSlice.actions;
