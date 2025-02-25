import React from 'react';
import Popup from 'reactjs-popup';
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
                <input className={styles.input} value={props.playlistName} onClick={props.onNameClick} onChange={handleNameChange}/>
                
                <FontAwesomeIcon className={styles.icon} icon={faPencil} onClick={props.onClick}/>
            </div>

            <div className={styles.Tracklist}>
                <Tracklist userSearchResults={props.playlistTracks} onRemove={props.onRemove} isRemoval={props.isRemoval}/>

                <button className={styles.PlaylistSave} onClick={props.onSave}>SAVE TO SPOTIFY</button>
                
                <Popup open={props.open}>
                    <div className={styles.SavePopup}>
                        <button className={styles.SaveClose} onClick={props.onClose}>
                            &times;
                        </button>
                        <h2>Rock on!</h2>
                        <p>Your new playlist is saved to Spotify</p>
                    </div>
                </Popup>
            </div>
        </div>
    );
}

export default Playlist;