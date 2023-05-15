const SearchFilter = ({ searchParams, handleSearchParams }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={searchParams} onChange={handleSearchParams} />
      </div>
    </div>
  );
};

export default SearchFilter;
