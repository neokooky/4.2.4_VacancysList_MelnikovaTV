import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    vacancies: [],
    page: 1,
    totalPages: 0,
    loading: false,
    skills: ["TypeScript", "React", "Redux"],
    selectedCity: "",
    searchValue: "",
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
    },
});
export default vacanciesSlice.reducer;
export const { setLoading, setPage, setSelectedCity, setTotalPages, setSearchValue, setVacancies, setSkills, } = vacanciesSlice.actions;
