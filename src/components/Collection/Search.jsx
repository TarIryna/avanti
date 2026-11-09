import { useState } from "react";
import { SearchInput } from "./styles";
import { useRouter } from "next/navigation";
import { SearchButton, SearchWrapper } from "./styles";
import SearchIcon from "@/assets/icons/search.svg";
import Image from "next/image";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const router = useRouter();

  const handleSearchChange = () => {
    const params = new URLSearchParams({ query: searchData.trim(), limit: "24", page: "1" });
    router.push(`/all/?${params}`);
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Пошук по назві, коду або штрихкоду"
        value={searchData}
        onChange={(e) => setSearchData(e?.target?.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchChange()
          }
        }}
        required
        name="search"
        id="name"
      />
      <SearchButton onClick={handleSearchChange}>
          <Image 
              alt="search"
              src={SearchIcon}
              width="20"
              height="20"
              />
      </SearchButton>
    </SearchWrapper>
  );
};
export default Search;
