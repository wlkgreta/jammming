import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

function Playlist(props) {
    function handleNameChange({target}) {
        props.onNameChange(target.value);
    };
    
    return (
        <div className={styles.Playlist}>
            <div className={styles.PlaylistName}>
                <input className={styles.input} value={props.playlistName} onClick={props.onClick} onChange={handleNameChange}/>
                
                <FontAwesomeIcon className={styles.icon} icon={faPencil} onClick={props.onClick}/>
            </div>

            <div className={styles.Tracklist}>
                <Tracklist userSearchResults={props.playlistTracks} onRemove={props.onRemove} isRemoval={props.isRemoval}/>

                <button className={styles.PlaylistSave} onClick={props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        </div>
    );
}

export default Playlist;