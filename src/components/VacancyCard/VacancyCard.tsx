import styles from "./VacancyCard.module.css";
import { Button, Flex, Group, Badge } from "@mantine/core";

type CardProps = {
  title: string;
  salary: string;
  city: string | null;
  company: string;
  experience: string;
  mainUrl: string;
  formatId: string | null;
  formatLabel: string | null;
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
}: CardProps) => {
  return (
    <div className={styles.vacancyCard}>
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
        <Button color="dark" variant="filled">
          Смотреть вакансию
        </Button>
        <a href={mainUrl} target="_blank">
          <Button color="gray" variant="light">
            Откликнуться
          </Button>
        </a>
      </Group>
    </div>
  );
};
