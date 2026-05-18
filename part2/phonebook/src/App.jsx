import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const Persons = ({ personsToShow, setPersons, persons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personService
        .deletePerson(person)
        .then((response) =>
          setPersons(persons.filter((person) => response.id !== person.id)),
        );
    }
  };

  return personsToShow.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
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

const PersonForm = ({ persons, setPersons, setNotification, setSuccess }) => {
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
    const found = persons.find((person) => person.name === newName);

    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .replacePersonNumber(found, newNumber)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                found.id === person.id ? response : person,
              ),
            );
          })
          .catch(() => {
            setSuccess(false);
            setNotification(
              `Person ${found.name} was already removed from server`,
            );
            setTimeout(() => setNotification(null), 5000);
            return;
          });
        setSuccess(true);
        setNotification(`Number of ${found.name} changed`);
        return;
      } else {
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .createPerson(newPerson)
      .then((response) => setPersons(persons.concat(response)));
    setSuccess(true);
    setNotification(`Added ${newPerson.name}`);
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
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const [showAll, setShowAll] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(true);

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isSuccessful={success} />
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        setShowAll={setShowAll}
      />
      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
        setSuccess={setSuccess}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
