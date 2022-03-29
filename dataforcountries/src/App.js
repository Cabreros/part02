import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    if (filter !== "") {
      setShowAll(false);
    }
    setFilter(event.target.value);
  };

  const filterCountries = showAll
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <Countries countries={filterCountries} />
    </>
  );
}

export default App;
