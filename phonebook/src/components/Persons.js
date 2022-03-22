const Persons = (props) => {
  return (
    <>
      {props.filterNumbers.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );
};

export default Persons;
