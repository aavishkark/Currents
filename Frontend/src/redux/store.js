import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk } from "redux-thunk"
import { authReducer, weatherReducer, favoritesReducer, preferencesReducer } from "./reducers"

const rootReducer = combineReducers({
    authReducer,
    weatherReducer,
    favoritesReducer,
    preferencesReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
