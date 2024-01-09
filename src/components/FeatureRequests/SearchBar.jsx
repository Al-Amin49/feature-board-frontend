import { debounce } from "lodash";

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {

  const debouncedSubmit = debounce((value) => onSearchSubmit(value), 500);
  
  const handleChange = (e) => {
    if (e && e.target) {
      const inputValue = e.target.value;
      console.log(inputValue);
      onSearchChange(e);
      debouncedSubmit(inputValue); // Trigger search on every change
    } else {
      console.error('Invalid event or target in searchBar');
    }
  };

  return (
    <fieldset className="form-control w-80 px-4">
      <div className="join">
        <input
          type="text"
          placeholder="search"
          className="input input-bordered join-item"
          value={searchQuery}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
        />
      </div>
    </fieldset>
  );
};

export default SearchBar;
