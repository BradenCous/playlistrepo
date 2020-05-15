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
        if (playlist.name === null && playlist.data === null) {
            dispatch(startDeletingPlaylist(playlist));
        } else {
            dispatch(leaveEditMode(playlist));
        }
    }

    const onSave = () => {
        var dataStr = plURL + "&" + artURL;
        // if (plURL === null) {
        //     setplURL("https://www.spotify.com/us/");
        // }

        // if (artURL === null) {
        //     setartURL("https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png");
        // }
        dispatch(startSavingPlaylist({
            id: playlist.id,
            name,
            data: dataStr,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingPlaylist(playlist));
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
            // <div className="root-container" id="playlist-root">
                <div className="playlist" id="playlist-object" >
                    <button onClick={onEdit} id="edit-button" className="edit-button">
                        ...
                    </button>

                    {/* <label id="name">{playlist.name}</label> */}

                    {/* <a href={playlist.data} target="_blank">Playlist</a> */}
                    
                    <img id="artwork" src={artURL}></img>
                </div>
            // </div>

            
            
        );
        
    }

    
}