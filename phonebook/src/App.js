import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import noteService from "./modules/networking";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((allPeople) => setPersons(allPeople));
  }, []);

  const findDuplicate = persons.find((person) => person.name === newName);

  const addPerson = (event) => {
    event.preventDefault();
    if (findDuplicate) {
      const msg = `${findDuplicate.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(msg)) {
        noteService
          .update(findDuplicate.id, {
            name: newName,
            number: newNum,
          })
          .then((update) => {
            setPersons(
              persons.map((person) =>
                person.id !== update.id ? person : update
              )
            );
            setNewName("");
            setNewNum("");
          });
      }
    } else {
      const newPerson = { name: newName, number: newNum };

      noteService
        .create(newPerson)
        .then((newAdd) => setPersons(persons.concat(newAdd)));
      setNewName("");
      setNewNum("");
    }
  };

  const delPerson = (event) => {
    if (window.confirm(`Delete ${event.target.name} ?`) === true) {
      noteService.del(event.target.id);
      setPersons(persons.filter((person) => person.id != event.target.id));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
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
      <Persons filterNumbers={filterNumbers} delPerson={delPerson} />
    </div>
  );
};

export default App;
