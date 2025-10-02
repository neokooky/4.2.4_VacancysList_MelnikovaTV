import styles from "./VacancyCard.module.css";
import { Button, Flex, Group, Badge } from "@mantine/core";
import { Link, useMatch } from "react-router-dom";

type CardProps = {
  title: string;
  salary: string;
  city: string | null;
  company: string;
  experience: string;
  mainUrl: string;
  formatId: string | null;
  formatLabel: string | null;
  id: string;
};

export const VacancyCard = ({
  title,
  salary,
  city,
  company,
  experience,
  mainUrl,
  formatId,
  formatLabel,
  id,
}: CardProps) => {
  const match = useMatch("/vacancies/:id");

  return (
    <div className={styles["vacancy-card"]}>
      <h3 className={styles.title}>{title}</h3>
      <Flex align="center" gap="xs" mb={16}>
        <p className={styles.salary}>{salary}</p>
        <span className={styles.experience}>{experience}</span>
      </Flex>
      <p className={styles.company}>{company}</p>
      {formatLabel && (
        <Badge
          radius="xs"
          mb={4}
          color={
            formatId === "REMOTE"
              ? "rgba(66, 99, 235, 1)"
              : formatId === "HYBRID"
              ? "rgba(0, 0, 0)"
              : "rgba(15, 15, 16, 0.1)"
          }
          variant={formatId === "ON_SITE" ? "light" : "filled"}
        >
          {formatLabel}
        </Badge>
      )}

      <p>{city}</p>
      <Group className={styles.buttons}>
        {!match ? (
          <Link to={`/vacancies/${id}`}>
            <Button color="dark" variant="filled">
              Смотреть вакансию
            </Button>
          </Link>
        ) : null}

        <Link to={mainUrl}>
          <Button
            color={!match ? "gray" : "dark"}
            variant={!match ? "light" : "filled"}
          >
            Откликнуться
          </Button>
        </Link>
      </Group>
    </div>
  );
};
