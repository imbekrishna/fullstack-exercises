import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);

  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchValue(search);
    const result = persons.filter((e) => {
      return e.name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFiltered(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        { id: persons.length + 1, name: newName, number: newPhone },
      ]);
    }
    setNewName("");
    setNewPhone("");
  };

  const personExists = (name) => {
    const exists = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return true;
    } else {
      return false;
    }
  };

  const filteredContacts = searchValue.length > 0 ? filtered : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchValue} fieldChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredContacts} />
    </div>
  );
};

export default App;
