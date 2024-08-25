import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = (props) => {
  const { celebList } = props?.data
  const { setFilteredCelebrityList } = props?.handler

  const initialSearchValue = "";
  const [searchInput, setSearchInput] = useState(initialSearchValue);

  const handleSearchOnChange = (event) => {
    const { id, value } = event?.target
    setSearchInput(value);
    handleSearch(value);
  };
  console.log("Search Input =>", searchInput);  

  const handleSearch = (value) => {
    const searchedCelebrityList = celebList.filter((celeb) =>
      celeb?.first.toLowerCase().includes(value.toLowerCase()) || celeb?.last.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCelebrityList(searchedCelebrityList);
  };

  return (
    <div className="row justify-content-center my-3">
      <div className="search-box col-8">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search User"
          value={searchInput}
          onChange={handleSearchOnChange}
        ></input>
      </div>
    </div>
  )
}

export default Search