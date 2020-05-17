import React, { useEffect } from 'react';
import './App.css';
import { Playlist } from './Playlist';
import { useSelector, useDispatch } from 'react-redux';
import { loadDB, startAddingPlaylist } from './actions';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() { 
  return (
    <div className="App">
      <Router>
      <div>
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

  return (
    <div className="root">
      <div>
        <h1>playlist library</h1>
          <Link to="/playlistcreator" id="creator-link">create</Link>
      </div>
      <div className="playlist-container">
        {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)}
      </div>
    </div>
    
  ); 
}

function PlaylistCreator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDB(0));
  }, [dispatch]);
 
  const onAdd = () => {
    dispatch(startAddingPlaylist("New Playlist", "https://www.spotify.com/us/&https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"));
  }

  return (
    <div className="root">
    <div>
      <h1>create a new playlist</h1>
      <Link to="/" id="library-link">library</Link>
    </div>
    <div className="playlist-container-new">
      <p>
      thank you for coming to add to the library<br/><br/>

      after you click the "New Playlist" button at the bottom of this box, you will find a default playlist in the libray<br/><br/>
      
      you can give the playlist life by finding it on the library page, hovering over it, and clicking the "edit" button<br/><br/>
        
      to help keep things pretty, please have a raw link ready to display your awesome cover art image<br/><br/>

      after clicking "go", a new tab will open with the designated playlist in Spotify<br/><br/>

      enjoy!<br/>
      </p>

    </div>
    <button onClick={onAdd} id="newpl-button">New Playlist</button>
  </div>
  );
}


export default App;
