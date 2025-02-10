import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            <Tracklist 
                userSearchResults={props.userSearchResults}              isRemoval={true} 
                onAdd={props.onAdd}
            />
        </div>
    );
}

export default SearchResults;