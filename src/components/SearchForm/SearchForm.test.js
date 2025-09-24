import { jsx as _jsx } from "react/jsx-runtime";
import { describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { SearchForm } from "./SearchForm";
import { store } from "../../store/store";
import { Provider } from "react-redux";
describe("SearchForm", () => {
    const setup = () => {
        return render(_jsx(Provider, { store: store, children: _jsx(MantineProvider, { children: _jsx(SearchForm, {}) }) }));
    };
    it("рендерит инпут", () => {
        setup();
        expect(screen.getByPlaceholderText("Должность или название компании")).toBeInTheDocument();
    });
    it("рендерит кнопку поиска", () => {
        setup();
        expect(screen.getByText("Найти")).toBeInTheDocument();
    });
    it("позволяет вводить текст в инпут", () => {
        setup();
        const input = screen.getByPlaceholderText("Должность или название компании");
        fireEvent.change(input, { target: { value: "Junior" } });
        expect(input).toHaveValue("Junior");
    });
    it("отправляет форму по Enter", () => {
        setup();
        const input = screen.getByPlaceholderText("Должность или название компании");
        fireEvent.keyDown(input, { key: "Enter" });
    });
});
