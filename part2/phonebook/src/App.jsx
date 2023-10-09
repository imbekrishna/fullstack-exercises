import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
        { id: persons.length + 1, name: newName, phone: newPhone },
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
