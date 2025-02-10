import React from 'react';
import styles from './Track.module.css';


function Track(props) {
    function renderAction() {
        if (props.isRemoval) {
            return <button className={styles.TrackAction} onClick={passTrack}>+</button>;
        } else {
            return <button className={styles.TrackAction}>-</button>;
        }
    }

    function passTrack() {
        props.onAdd(props.track);
    }

    return (
        <div className={styles.Track}>
            <div className={styles.TrackInformation}>
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {/*<button className={styles.TrackAction}>{renderAction()}</button>*/}
            {renderAction(props)}
        </div>
    );
}

export default Track;