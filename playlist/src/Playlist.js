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
                <label className="pledit-text">name: </label>
                <input type="text" value={name} onChange={e =>
                setName(e.target.value)}/>

                <label className="pledit-text">playlist url: </label>
                <input type="text" value={plURL} onChange={e =>
                setplURL(e.target.value)}/>

                <label className="pledit-text">artwork url: </label>
                <input type="text" value={artURL} onChange={e =>
                setartURL(e.target.value)}/>


                <button onClick={onSave} id="savebtn" className="scdBtns">save</button>
                <button onClick={onCancel} id="canbtn" className="scdBtns">cancel</button>
                <button onClick={onDelete} id="delbtn" className="scdBtns">delete</button>
            </div>
        );     
    } else {
        return (
                <div className="playlist" id="playlist-object" >
                    
                    <img src={artURL} alt="Playlist Artwork" className="artwork" id="artwork"/>
                    <div className="top-layer">
                        <p>{name}</p>
                        <button onClick={openPL} id="goto-button" className="button">go</button>
                        <button onClick={onEdit} id="edit-button" className="button">edit</button>
                    </div>                    
                </div>
        );
        
    }

    
}