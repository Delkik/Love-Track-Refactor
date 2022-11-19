import {configureStore, combineReducers} from "@reduxjs/toolkit"
import tokenReducer from "./tokens"
import userReducer from "./user"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfigUser = {
  key: 'root',
  storage,
}

const persistConfigTokens = {
    key: 'root',
    storage,
  }

const allReducers = combineReducers({
    user: persistReducer(persistConfigUser, userReducer),
    tokens: persistReducer(persistConfigTokens, tokenReducer)
});
  
// const persistedReducer = persistReducer(persistConfig, {
//     tokens: tokenReducer,
//     user: userReducer,
// })

export const store = configureStore({
    reducer: allReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)