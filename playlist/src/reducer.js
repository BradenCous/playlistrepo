import { Action } from './actions';

const initialState = {
    isWaiting: false, // THIS IS THE SPINNING WHEEL
    playlists: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.LoadPlaylists:
            return {
                ...state,
                playlists: action.payload,
            };
        case Action.FinishAddingPlaylist:
            return {
                ...state,
                playlists: [{...action.payload, isEditing: true}, ...state.playlists],
            };
        case Action.EnterEditMode:
            return {
                   ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.name === action.payload.name && playlist.data === action.payload.data) {
                        return {...playlist, isEditing: true};
                    } else {
                        return playlist;
                    }
                }),
            };
        case Action.LeaveEditMode:
            return {
                    ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.id) {
                        return {...playlist, isEditing: undefined};
                    } else {
                        return playlist;
                    }
                }),
            };
        case Action.FinishSavingPlaylist:
            return {
                    ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return playlist;
                    }
                }),
            };
        case Action.FinishDeletingPlaylist:
            return {
                    ...state,
                playlists: state.playlists.filter(playlist => playlist.id !== action.payload.id),
            };
        default:
            return state;
    }
    
}

export default reducer;