const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const SET_TOKEN = 'SET_TOKEN';

export function update_user_info(payload){
    return {
        type: UPDATE_USER_INFO,
        payload
    }
}

export function set_token(payload){
    return {
        type: SET_TOKEN,
        payload
    }
}

const initialState = {
    user: false,
    token: null
}

export function sessionReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case UPDATE_USER_INFO:
            newState = { ...state, user: action.payload };
            return newState;
        case SET_TOKEN:
            newState = { ...state, token: action.payload };
            return newState;
        default:
            return state;
    }
}