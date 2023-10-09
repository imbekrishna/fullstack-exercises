import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((data) => setPersons(data));
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
      const doUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (doUpdate) {
        const person = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        const personObject = { ...person, number: newPhone };

        phonebookService
          .update(person.id, personObject)
          .then((data) =>
            setPersons(persons.map((p) => (p.id !== person.id ? p : data)))
          );
      }
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newPhone,
      };

      phonebookService
        .create(personObject)
        .then((response) => setPersons([...persons, response]));
    }
    setNewName("");
    setNewPhone("");
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      phonebookService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
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
      <Persons persons={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
