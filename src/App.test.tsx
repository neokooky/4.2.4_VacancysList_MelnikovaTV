import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import { vi, type Mock } from "vitest";
import { MantineProvider } from "@mantine/core";

global.fetch = vi.fn();

describe("App", () => {
  const setup = () => {
    return render(
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    );
  };

  it("отображает заголовок и форму поиска", () => {
    setup();
    expect(screen.getByText("Список вакансий")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Должность или название компании")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Найти" })).toBeInTheDocument();
  });

  it("ввод в поисковое поле не вызывает запрос", async () => {
    setup();

    (global.fetch as Mock).mockClear();

    const input = screen.getByPlaceholderText(
      "Должность или название компании"
    );
    await userEvent.type(input, "React");

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("нажатие 'Найти' вызывает загрузку вакансий", async () => {
    setup();

    const input = screen.getByPlaceholderText(
      "Должность или название компании"
    );
    await userEvent.type(input, "React");

    const button = screen.getByRole("button", { name: "Найти" });
    await userEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const url = (global.fetch as Mock).mock.calls[0][0];
      expect(url).toContain("React");
      expect(url).toContain("page=0");
    });
  });

  it("смена города вызывает запрос", async () => {
    setup();
    (global.fetch as Mock).mockClear();

    const select = screen.getByTestId("city-select");
    await userEvent.selectOptions(select, "1");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const url = (global.fetch as Mock).mock.calls[0][0];
      expect(url).toContain("area=1");
    });
  });

  it("добавление навыка вызывает запрос", async () => {
    setup();

    const input = screen.getByPlaceholderText("Навык");
    const button = screen.getByAltText("add");

    await userEvent.type(input, "TypeScript");
    await userEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const url = (global.fetch as Mock).mock.calls[0][0];
      expect(url).toContain("TypeScript");
    });
  });
});
