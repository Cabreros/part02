import { useState } from "react";
import Country from "./Country";

const ShowCountries = ({ country }) => {
  const [showDetail, setShowDetails] = useState(false);

  return (
    <>
      <button variant="text" onClick={() => setShowDetails(!showDetail)}>
        Show
      </button>
      {showDetail ? <Country country={country} /> : null}
    </>
  );
};

export default ShowCountries;
