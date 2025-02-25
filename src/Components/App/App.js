import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify/Spotify';

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [searchResults, setSearchResults] = useState([ ]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  //Login authorization
  useEffect(() => {
    const authenticated = Spotify.checkAuth();
    if (authenticated) {
      Spotify.getAccessToken();
      setLoggedStatus(true);
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  }, []);

  function handleLogin() {
    Spotify.getAccessToken();
  };

  //Search
  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  //Clear and update Playlist Name
  function handleClearClick() {
    setPlaylistName('');
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  //Add and Remove tracks
  function addTrack(track) {
    const existingTrack = playlistTracks.find(t => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      alert('Track already in playlist');
    } else {
      setPlaylistTracks(newTrack);
      //remove added track from search results
      const updatedResults = searchResults.filter(t => t.id !== track.id);
      setSearchResults(updatedResults);
    }
  }
    
  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  //Save Playlist
  function handleSavePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
  }

//If not logged in, see login page
  if (!loggedStatus) {
    return (
      <div className={styles.LoginBackground}>
      <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
        <div className={styles.LoginPage}>
          <h2 >Login to start Ja<span className={styles.m}>m</span><span className={styles.mm}>m</span><span className={styles.mmm}>m</span>ing!</h2>
          <button className={styles.LoginButton} onClick={handleLogin}>Login with Spotify</button>
        </div>
      </div>
    )
  //If logged in, go immediately to app
  } else {
    return (
      <div>
        <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
        <div className={styles.App}>
          
          <div>
            <SearchBar onSearch={search}/>
          </div>
  
          <div className={styles.AppPlaylist}>
            <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
            
            <Playlist playlistName={playlistName} onNameClick={handleClearClick} onNameChange={updatePlaylistName} playlistTracks={playlistTracks} onRemove={removeTrack} onSave={handleSavePlaylist} onClose={closePopup} open={showPopup}/>
            
          </div>
        </div>
      </div>
    );
  }

}

export default App;
