import styles from "./AboutMe.module.css";

export const AboutMe = () => {
  return (
    <div className={styles.aboutme}>
      <div className={styles.info}>
        <h1>Мельникова Татьяна</h1>
        <p>
          Может быть я-таки закончу Ката Академи и сменю профессию (уже верится
          с трудом)
        </p>
      </div>
    </div>
  );
};
