const Persons = ({ filterNumbers, delPerson }) => {
  return (
    <>
      {filterNumbers.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={delPerson} id={person.id} name={person.name}>
            delete
          </button>
        </li>
      ))}
    </>
  );
};

export default Persons;
