import { jsx as _jsx } from "react/jsx-runtime";
import { describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { SearchForm } from "./SearchForm";
const renderWithMantine = (component) => {
    return render(_jsx(MantineProvider, { children: component }));
};
describe("SearchForm", () => {
    it("отображает значение поиска", () => {
        renderWithMantine(_jsx(SearchForm, { searchValue: "React", setSearchValue: () => { }, onSearch: () => { } }));
        expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    });
    it("вызывает setSearchValue при вводе", () => {
        const setSearchValue = vi.fn();
        renderWithMantine(_jsx(SearchForm, { searchValue: "", setSearchValue: setSearchValue, onSearch: () => { } }));
        const input = screen.getByPlaceholderText("Должность или название компании");
        fireEvent.change(input, { target: { value: "Junior" } });
        expect(setSearchValue).toHaveBeenCalledWith("Junior");
    });
    it("вызывает onSearch при клике на кнопку", () => {
        const onSearch = vi.fn();
        renderWithMantine(_jsx(SearchForm, { searchValue: "", setSearchValue: () => { }, onSearch: onSearch }));
        const button = screen.getByText("Найти");
        fireEvent.click(button);
        expect(onSearch).toHaveBeenCalled();
    });
    it("вызывает onSearch при нажатии Enter", () => {
        const onSearch = vi.fn();
        renderWithMantine(_jsx(SearchForm, { searchValue: "", setSearchValue: () => { }, onSearch: onSearch }));
        const input = screen.getByPlaceholderText("Должность или название компании");
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSearch).toHaveBeenCalled();
    });
});
