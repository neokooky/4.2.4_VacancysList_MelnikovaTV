import { useParams } from "react-router-dom";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";
import styles from "./VacancyPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVacancyById } from "../../api/fetchVacancyById";
import { Flex, Box } from "@mantine/core";

export const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadVacancy = async () => {
      setLoading(true);
      try {
        const vacancy = await fetchVacancyById(id);
        setVacancy(vacancy);
      } catch (error) {
        console.error("Ошибка загрузки вакансии: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadVacancy();
  }, [dispatch, id]);

  const workFormats = (vacancy && vacancy.work_format) || [];

  const format = workFormats.some((f) => f.id === "HYBRID")
    ? { id: "HYBRID", name: "Гибрид" }
    : workFormats.some((f) => f.id === "REMOTE")
    ? { id: "REMOTE", name: "Можно удалённо" }
    : workFormats.some((f) => f.id === "ON_SITE")
    ? { id: "ON_SITE", name: "Офис" }
    : null;

  if (loading) {
    return (
      <Flex justify="center" mt="md" mb={24}>
        <Box>Загрузка...</Box>
      </Flex>
    );
  }

  // if (!loading && !vacancy) {
  //   return (
  //     <div
  //       style={{
  //         width: 658,
  //         backgroundColor: "white",
  //         borderRadius: 12,
  //         marginTop: 24,
  //         display: "flex",
  //         marginInline: "auto",
  //         height: 180,
  //         padding: 16,
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       Вакансия не найдена
  //     </div>
  //   );
  // }

  return (
    <>
      {vacancy ? (
        <div className={styles.wrapper}>
          <div className={styles.data}>
            <VacancyCard
              mainUrl={vacancy.alternate_url}
              key={vacancy.id}
              title={vacancy.name}
              company={vacancy.employer?.name || "Не указано"}
              salary={
                vacancy.salary
                  ? `${vacancy.salary.from ? vacancy.salary.from : ""}${
                      vacancy.salary.to ? ` - ${vacancy.salary.to}` : ""
                    } ${vacancy.salary.currency}`
                  : "Не указана"
              }
              city={vacancy.area?.name || null}
              experience={vacancy.experience?.name || ""}
              formatId={format?.id || null}
              formatLabel={format?.name || null}
              id={vacancy.id}
            />
          </div>

          {vacancy.description && (
            <div className={styles.description}>
              <p
                style={{ marginBottom: 12 }}
                dangerouslySetInnerHTML={{
                  __html: vacancy.description || "",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: 658,
            backgroundColor: "white",
            borderRadius: 12,
            marginTop: 24,
            display: "flex",
            marginInline: "auto",
            height: 180,
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Вакансия не найдена
        </div>
      )}
    </>
  );
};

// : (
//         <div
//           style={{
//             width: 658,
//             backgroundColor: "white",
//             borderRadius: 12,
//             marginTop: 24,
//             display: "flex",
//             marginInline: "auto",
//             height: 180,
//             padding: 16,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           Вакансия не найдена
//         </div>
//       )
