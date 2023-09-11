import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

export default function Countrylist({ cities, isLoading }) {
  if (isLoading) <Spinner />;

  if (!cities.length)
    return (
      <Message message="There is No country in the list until you not selected the city on the map" />
    );

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((city) => city.country).includes(curr.country))
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
