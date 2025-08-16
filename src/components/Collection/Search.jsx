import { changeQueryAction } from "@/store/actions/products";
import { useState } from "react";
import { SearchInput } from "./styles";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
    changeQueryAction(e.target.value);
  };
  return (
    <SearchInput
      type="text"
      placeholder="Пошук по назві або коду"
      value={searchData}
      onChange={(e) => handleSearchChange(e)}
      required
      name="search"
      id="name"
    />
  );
};
export default Search;
