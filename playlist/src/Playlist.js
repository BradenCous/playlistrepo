import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enterEditMode, leaveEditMode, startSavingPlaylist, startDeletingPlaylist } from './actions';

export var plID = -1;

export function Playlist(props) {
    const playlist = props.playlist;
    const dispatch = useDispatch();

    const [name, setName] = useState(playlist.name);
    const [data, setData] = useState(playlist.data);

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
        dispatch(startSavingPlaylist({
            id: playlist.id,
            name,
            data,
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingPlaylist(playlist));
    }
 
    // const addIfBlank = (dataPiece) => {
    //     if (dataPiece === null) {
    //         var current = new Date();
    //         return "New Playlist" + current;
    //     } else {
    //         return dataPiece;
    //     }
    // }    
        
        
    
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
                    
                    <img id="artwork" src="https://pro2-bar-s3-cdn-cf6.myportfolio.com/1fabf4ed77f805d754b14c5b7b6b7fb1/08196ebf3a4ad86ddbd1057860ae28c9caae76ca0f80fb65e035d8696cc58e354b3de0fde9bbfb6b_rw_1200.jpg?h=5e43ffa86778caa3e87507b8eb4338fd"></img>
                </div>
            // </div>

            
            
        );
        
    }

    
}