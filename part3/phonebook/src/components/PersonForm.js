const PersonForm = ({ addNumber, newName, handleNameChange, handleNumberChange, newNumber }) => {
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addNumber}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
