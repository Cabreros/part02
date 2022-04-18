const Persons = ({ filterNumbers, delPerson }) => {
  return (
    <>
      {filterNumbers.map((person) => (
        <li key={person.content.name}>
          {person.content.name} {person.content.number}{" "}
          <button onClick={delPerson} id={person.id} name={person.content.name}>
            delete
          </button>
        </li>
      ))}
    </>
  );
};

export default Persons;
