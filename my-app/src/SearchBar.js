import React, { useState } from 'react';
import './SearchBar.css';
function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // 執行搜索邏輯
    onSearch(searchText);
    sessionStorage.setItem("searchText",searchText)
  };

  return (
    <div className='SearchBar'>
      <input type="text"  placeholder="Search for Pictures" value={searchText} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
