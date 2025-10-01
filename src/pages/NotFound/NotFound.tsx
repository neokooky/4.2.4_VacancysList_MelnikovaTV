import { Button } from "@mantine/core";
import styles from "./NotFound.module.css";
import cat from "../../images/not-found.jpg";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  // const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.return}>
        <div className={styles.notification}>
          <h1>Упс! Такой страницы не существует</h1>
          <p>Давайте перейдём к началу.</p>
        </div>
        <div className={styles.returnButton}>
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </div>
      <div>
        <img src={cat} />
      </div>
    </div>
  );
};
