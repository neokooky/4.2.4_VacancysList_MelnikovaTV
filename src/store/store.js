import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./vacanciesSlice";
export const store = configureStore({
    reducer: {
        vacancies: vacanciesReducer,
    },
});
