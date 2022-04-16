const Persons = ({ filterNumbers, delPerson }) => {
  return (
    <>
      console.log(person);
      {filterNumbers.map((person) => (
        <li key={person.content.name}>
          {person.content.name} {person.content.number}{" "}
          <button
            onClick={delPerson}
            id={person.content.name}
            name={person.content.name}
          >
            delete
          </button>
        </li>
      ))}
    </>
  );
};

export default Persons;
