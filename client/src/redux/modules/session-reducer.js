const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export function update_user_info(payload){
    return {
        type: UPDATE_USER_INFO,
        payload
    }
}

const initialState = {
    user: false
}

export function sessionReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case UPDATE_USER_INFO:
            newState = { ...state, user: action.payload };
            return newState;
        default:
            return state;
    }
}