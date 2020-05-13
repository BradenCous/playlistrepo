export const Action = Object.freeze({
    LoadPlaylists: 'LoadPlaylists',
    FinishAddingPlaylist: 'FinishAddingPlaylist',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingPlaylist: 'FinishSavingPlaylist',
});

export function loadPlaylists(playlists) {
    return {
        type: Action.LoadPlaylists,
        payload: playlists,
    };
}

export function finishAddingPlaylist(playlist) {
    return {
        type: Action.FinishAddingPlaylist,
        payload: playlist,
    };
}

export function finishSavingPlaylist(playlist) {
    return {
        type: Action.FinishSavingPlaylist,
        payload: playlist,
    };
}

export function enterEditMode(playlist) {
    return {
        type: Action.EnterEditMode,
        payload: playlist,
    };
}

export function leaveEditMode(playlist) {
    return {
        type: Action.LeaveEditMode,
        payload: playlist,
    };
}

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://p2-playlist.duckdns.org:8442';

export function loadDB() {
    return dispatch => {
        fetch(`${host}/playlists`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(loadPlaylists(data.playlists));
                }
            })
        .catch(e => console.error(e));
    }
}

export function startAddingPlaylist(name, data) {
    const playlist = {name: '', data: ''};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlist),
    }
    return dispatch => {
        fetch(`${host}/playlists`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    playlist.id = data.id;
                    dispatch(finishAddingPlaylist(playlist));
                }
            })
        .catch(e => console.error(e));
    }
}

export function startSavingPlaylist(playlist) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlist),
    }
    return dispatch => {
        fetch(`${host}/playlists/${playlist.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(finishSavingPlaylist(playlist));
                }
            })
        .catch(e => console.error(e));
    }
}