import {configureStore, combineReducers} from "@reduxjs/toolkit"
import tokenReducer from "./tokens"
import userReducer from "./user"
import postsReducer from "./posts"
import likesReducer from "./likes"
import SongsReducer from "./songs"
import potentialReducer from "./potentialMatches"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfigUser = {
  key: 'user',
  storage,
}

const persistConfigTokens = {
  key: 'tokens',
  storage,
}

const persistConfigPosts = {
  key: 'posts',
  storage,
}

const persistConfigSongs = {
  key: 'songs',
  storage,
}

const persistConfigLikes = {
  key: 'likes',
  storage,
}

const persistConfigPotential = {
  key: 'potentials',
  storage,
}

const allReducers = combineReducers({
    user: persistReducer(persistConfigUser, userReducer),
    tokens: persistReducer(persistConfigTokens, tokenReducer),
    posts: persistReducer(persistConfigPosts, postsReducer),
    likes: persistReducer(persistConfigLikes, likesReducer),
    potentials: persistReducer(persistConfigPotential, potentialReducer),
    songs: persistReducer(persistConfigSongs, SongsReducer)


});

export const store = configureStore({
    reducer: allReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)