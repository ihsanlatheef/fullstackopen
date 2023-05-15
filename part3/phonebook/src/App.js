import { useEffect, useState } from "react";
import DisplayResults from "./components/DisplayResults";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import Notificaiton from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchParams, setSearchParams] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    contactService.getAll().then((initialContacts) => setPersons(initialContacts));
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.find((entry) => newName === entry.name)) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        setNewName("");
        setNewNumber("");
        return;
      }
      const personExistingObj = persons.find((p) => p.name === newName);
      const updatedPerson = { ...personExistingObj, number: newNumber };
      contactService
        .update(updatedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          console.log("returnedObj: ", returnedPerson);
          setPersons(persons.map((p) => (p.id !== updatedPerson.id ? p : returnedPerson)));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(`Information of ${updatedPerson.name} has already been removed from server!`);
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      return;
    }
    const person = {
      name: newName,
      number: newNumber,
    };
    contactService.create(person).then((returnedPerson) => {
      setMessage(`Successfully added ${returnedPerson.name} to database!`);
      setMessageType("notification");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (event) => {
    event.preventDefault();
    const deletionId = event.target.dataset.id;
    if (window.confirm(`Are you sure you want to delete '${event.target.previousSibling.wholeText}'?'`)) {
      contactService.remove(deletionId).then(() => {
        setPersons(
          persons.filter((person) => {
            return person.id !== parseInt(deletionId);
          })
        );
      });
    }
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleSearchParams = (event) => {
    event.preventDefault();
    setSearchParams(event.target.value);
    let newResults = [];
    persons.forEach((entry) => {
      if (entry.name.toLocaleLowerCase().includes(searchParams.toLocaleLowerCase())) {
        newResults.push(entry);
      }
    });
    setSearchResults(newResults);
  };

  return (
    <div>
      <Notificaiton message={message} messageType={messageType} />
      <SearchFilter searchParams={searchParams} handleSearchParams={handleSearchParams} />
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <DisplayResults persons={persons} searchResults={searchResults} searchParams={searchParams} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
