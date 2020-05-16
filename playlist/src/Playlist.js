import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingPlaylist, startDeletingPlaylist } from './actions';

export var plID = -1;

export function Playlist(props) {
    const playlist = props.playlist;
    const dispatch = useDispatch();

    const getPlaylistUrlFromData = (data) => {
        if (data !== null && data.includes("&")) {
            var str = data;
            str = data.substring(0, data.indexOf("&"));
            return str;
        } else {
            return null
        }  
    }

    const getArtworkUrlFromData = (data) => {
        if (data !== null) {
            var str = data;
            str = data.substring(data.indexOf("&") + 1, data.length);
            return str;
        } else {
            return null
        }  
    }



    const [name, setName] = useState(playlist.name);
    const [plURL, setplURL] = useState(getPlaylistUrlFromData(playlist.data));
    const [artURL, setartURL] = useState(getArtworkUrlFromData(playlist.data));

    const onEdit = () => {
        dispatch(enterEditMode(playlist));
    }

    const onCancel = () => {
            dispatch(leaveEditMode(playlist));
    }

    const onSave = () => {
        var dataStr = plURL + "&" + artURL;
        console.log(dataStr)
        dispatch(startSavingPlaylist({
            id: playlist.id,
            name,
            data: dataStr,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingPlaylist(playlist));
    }
 
    const openPL = () => {
        window.open(
            plURL,
            '_blank'
          );
    }
    
    if(playlist.isEditing) {
        return (
            <div className="playlist" id="playlist-object">
                <label>Name: </label>
                <input type="text" value={name} onChange={e =>
                setName(e.target.value)}/>

                <label>Playlist URL: </label>
                <input type="text" value={plURL} onChange={e =>
                setplURL(e.target.value)}/>

                <label>Artwork URL: </label>
                <input type="text" value={artURL} onChange={e =>
                setartURL(e.target.value)}/>


                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        );     
    } else {
        return (
                <div className="playlist" id="playlist-object" >
                    
                    <img src={artURL} alt="Playlist Artwork" className="artwork" id="artwork"/>
                    <div className="top-layer">
                        <p>{name}</p>
                        <button onClick={openPL} id="goto-button" className="button">Go</button>
                        <button onClick={onEdit} id="edit-button" className="button">Edit</button>
                    </div>                    
                </div>
        );
        
    }

    
}