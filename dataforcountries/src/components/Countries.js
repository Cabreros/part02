import Country from "./Country";
import ShowCountries from "./ShowCountries";

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <div>Nothing found</div>;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return countries.map((country, index) => (
      <div key={index}>
        {country.name}
        <ShowCountries country={country} />
      </div>
    ));
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
};
export default Countries;
