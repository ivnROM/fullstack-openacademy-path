import { useState } from "react";

const Persons = ({ personsToShow }) => {
  return personsToShow.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
    </p>
  ));
};
const Filter = ({ filterName, setFilterName, setShowAll }) => {
  const handleFilterChange = (event) => {
    const newFilterName = event.target.value;
    setFilterName(newFilterName);
    newFilterName.length > 0 ? setShowAll(false) : setShowAll(true);
  };

  return (
    <div>
      filter shown with
      <input type="text" value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.some((person) => person.name === newName);

    if (found) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />{" "}
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />{" "}
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [showAll, setShowAll] = useState(true);
  const [filterName, setFilterName] = useState("");

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        setShowAll={setShowAll}
      />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
