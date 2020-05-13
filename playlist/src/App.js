import React, { useEffect } from 'react';
import './App.css';
import { Playlist } from './Playlist';
import { useSelector, useDispatch } from 'react-redux';
import { loadDB, startAddingPlaylist } from './actions';




function App() {
  const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();

  useEffect(() => {
    
    
    dispatch(loadDB(0));
  }, [dispatch]);
 
  const onAdd = () => {
    dispatch(startAddingPlaylist());
  }
  
  return (
    <div className="playlists-root">
      (REACT)
      <button onClick={onAdd}>New Playlist</button>
      {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)}
    </div>
  );
}

export default App;
