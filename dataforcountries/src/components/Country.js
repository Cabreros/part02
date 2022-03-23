const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      {country.languages.map((lang, index) => (
        <li key={index}>{lang.name}</li>
      ))}
      <img src={country.flag}></img>
    </>
  );
};

export default Country;
