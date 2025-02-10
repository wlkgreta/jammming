import React, {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "track name 1",
      artist: "track artist 1",
      album: "track album 1",
      id: 1,
    },
    {
      name: "track name 2",
      artist: "track artist 2",
      album: "track album 2",
      id: 2,
    },
  ]);

  const [playlistName, setPlaylistName] = useState("Playlist Name");
  
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "track name 1",
      artist: "track artist 1",
      album: "track album 1",
      id: 1,
    },
    {
      name: "track name 2",
      artist: "track artist 2",
      album: "track album 2",
      id: 2,
    },
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find(t => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('Track already in playlist');
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  return (
    <div>
      <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      <div className={styles.App}>
        <SearchBar/>
        <div className={styles.AppPlaylist}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
