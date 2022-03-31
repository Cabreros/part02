import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((e) => e.name === newName || e.number === newNum)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNum };
      console.log("button clicked", event.target);

      axios.post("http://localhost:3001/persons", newPerson).then(() => {
        console.log("promise fulfilled");
        setPersons(persons.concat(newPerson));
      });
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    if (filter !== "") {
      setShowAll(false);
    }
    setFilter(event.target.value);
  };

  const filterNumbers = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons filterNumbers={filterNumbers} />
    </div>
  );
};

export default App;
