import { createStore, combineReducers } from "@reduxjs/toolkit";

import { sessionReducer } from "./modules/session-reducer";

const appReducer = combineReducers({
    session: sessionReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export const store = createStore(rootReducer);

export default store;
