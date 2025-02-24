import React, {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleTermChange({target}) {
        setSearchTerm(target.value);
    };

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    function handleSearch() {
        props.onSearch(searchTerm);
    };

    return (
        <div className={styles.SearchBar}>
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} onKeyDown={handleKeyPress}/>
            <button className={styles.SearchButton} onClick={handleSearch}>SEARCH</button>
        </div>
    );
}

export default SearchBar;