import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingPlaylist } from './actions';


export function Playlist(props) {
    const playlist = props.playlist;
    const dispatch = useDispatch();

    const [name, setName] = useState(playlist.name);
    const [data, setData] = useState(playlist.data);

    const onEdit = () => {
        dispatch(enterEditMode(playlist));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(playlist));
    }

    const onSave = () => {
        dispatch(startSavingPlaylist({
            id: playlist.id,
            name,
            data,
        }));
    }

    if(playlist.isEditing) {
        return (
            <div className="playlist" id="playlist-object">
                <label>Name: </label>
                <input type="text" value={name} onChange={e =>
                setName(e.target.value)}/>
                <label>Data: </label>
                <input type="text" value={data} onChange={e =>
                setData(e.target.value)}/>

                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        );     
    } else {
        return (
            <div className="playlist" id="playlist-object">
                <button onClick={onEdit}>Edit</button>
            
                <span className="name">{playlist.name}</span>
                <span className="data">{playlist.data}</span>
            </div>
        );
    }

    
}