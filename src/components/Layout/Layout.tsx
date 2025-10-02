import { Group } from "@mantine/core";
import { Header } from "../../modules/Header/Header";
import logo from "../../images/logo.svg";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header>
        <Group className={styles["header-nav"]}>
          <Header.Logo src={logo} alt="Логотип" href="/" />
          <Header.Link
            className={styles["header-link-vacancies"]}
            href="/vacancies"
          >
            Вакансии FE
          </Header.Link>
        </Group>
        <Group className={styles["header-about"]}>
          <Header.Link className={styles["header-link-about"]} href="/aboutme">
            Обо мне
          </Header.Link>
        </Group>
      </Header>
      <Outlet />
    </>
  );
};
