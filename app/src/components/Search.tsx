import { ChangeEventHandler } from "react";

interface SearchProps {
  searchTerm: string;
  handleSearchTermInput: ChangeEventHandler<HTMLInputElement>
}

const Search = ({ searchTerm, handleSearchTermInput}: SearchProps) => {
  return (
    <input 
      type="search"
      name="search"
      className="search"
      value={searchTerm}
      data-testid="search"
      onChange={handleSearchTermInput}
    />
  )
}

export default Search;