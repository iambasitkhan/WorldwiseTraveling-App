import { Link } from "react-router-dom";
import { useCities } from "../contexts/CititesContext";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deletCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleCityDelete = function (e) {
    e.preventDefault();
    deletCity(id);
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles[`cityItem--active`] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleCityDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
