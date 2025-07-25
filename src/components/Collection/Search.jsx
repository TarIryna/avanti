import { changeQueryAction } from "@/store/actions/products";
import { useState } from "react";
const Search = () => {
  const [searchData, setSearchData] = useState("");
  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
    changeQueryAction(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Пошук по назві або коду"
      value={searchData}
      onChange={(e) => handleSearchChange(e)}
      required
      className="search_input peer"
    />
  );
};
export default Search;
