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
            }
        default:
            return state;
    }
    
}

export default reducer;