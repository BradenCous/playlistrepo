export const Action = Object.freeze({
    LoadPlaylists: 'LoadPlaylists',
});

export function loadPlaylists(playlists) {
    return {
        type: Action.LoadPlaylists,
        payload: playlists,
    };
}

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://p2-playlist.duckdns.org';

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