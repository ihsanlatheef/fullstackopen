const DisplayResults = (props) => {
  console.log("searchResults: ", props.searchResults);
  if (props.searchResults !== undefined && props.searchResults.length > 0 && props.searchParams) {
    return (
      <div>
        <h2>Search Results</h2>
        {props.searchResults.map((person) => (
          <p className="note" key={person.id}>
            {person.name} {person.number}{" "}
            <button data-id={person.id} type="submit" onClick={props.deletePerson}>
              Delete
            </button>
          </p>
        ))}
      </div>
    );
  } else {
    console.log("else here ...");
    return (
      <div>
        <h2>Numbers</h2>
        {props.persons.map((person) => (
          <p className="note" key={person.id}>
            {person.name} {person.number}{" "}
            <button data-id={person.id} type="submit" onClick={props.deletePerson}>
              Delete
            </button>
          </p>
        ))}
      </div>
    );
  }
};

export default DisplayResults;
