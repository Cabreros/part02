import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import noteService from "./modules/networking";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((allPeople) => setPersons(allPeople));
  }, []);

  const findDuplicate = persons.find(
    (person) => person.content.name === newName
  );

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNum };
    if (findDuplicate) {
      const msg = `${findDuplicate.content.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(msg)) {
        console.log(findDuplicate);
        noteService
          .update(findDuplicate.id, {
            content: {
              name: newName,
              number: newNum,
            },
          })
          .then((update) => {
            setErrorMessage(`Updated ${newName}'s number.`);
            setNewName("");
            setNewNum("");
            setTimeout(() => {
              setErrorMessage(null);
            });
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            console.log(error);
          });
      }
    } else {
      noteService
        .create(newPerson)
        .catch((error) =>
          setErrorMessage(
            `Information of ${newName} has already been removed from the server`,
            error
          )
        );
      setErrorMessage(`Added ${newName}`);
      setNewName("");
      setNewNum("");
    }
    noteService.getAll().then((allPeople) => setPersons(allPeople));
  };

  const delPerson = (event) => {
    if (window.confirm(`Delete ${event.target.name} ?`) === true) {
      console.log(event.target);
      noteService.del(event.target.id);
      noteService.getAll().then((allPeople) => setPersons(allPeople));
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
        person.content.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <Notification message={errorMessage} />
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
