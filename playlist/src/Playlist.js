import React from 'react';


export function Playlist(props) {
    const playlist = props.playlist;

    return (
        <div className="playlist">
            <span className="name">{playlist.name}</span>
            <span className="data">{playlist.data}</span>
        </div>
    );
}