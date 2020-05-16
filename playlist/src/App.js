import React, { useEffect } from 'react';
import './App.css';
import { Playlist } from './Playlist';
import { useSelector, useDispatch } from 'react-redux';
import { loadDB, startAddingPlaylist } from './actions';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  // const playlists = useSelector(state => state.playlists);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadDB(0));
  // }, [dispatch]);
 
  // const onAdd = () => {
  //   dispatch(startAddingPlaylist("NEW PLAYLIST", "NEW DATA"));
  // }
  
  return (
    <div className="App">
      <Router>
      <div>
        <nav id="header">
          <Link to="/">Playlists     </Link>
          <Link to="/playlistcreator">     Playlist Creator</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/playlistcreator">
            <PlaylistCreator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDB());
  }, [dispatch]);
 
  
  // "New Playlist", "https://www.spotify.com/us/&https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"

  

  return (
    <div className="root">
      <div>
        <h2>Playlist Library:</h2>
        {/* <button onClick={onAdd}>New Playlist</button> */}
      </div>
      <div className="playlist-container">
        {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)}
      </div>
      
      
    </div>
    
  ); 
}

function PlaylistCreator() {
  // const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDB(0));
  }, [dispatch]);
 
  const onAdd = () => {
    dispatch(startAddingPlaylist("New Playlist", "https://www.spotify.com/us/&https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"));
  }

  return (
    <div id="">
      <h1>How to Create a New Playlist</h1>


      <button onClick={onAdd}>New Playlist</button>
    </div>

    
    
  );
}


export default App;
