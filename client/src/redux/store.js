import {configureStore, combineReducers} from "@reduxjs/toolkit"
import tokenReducer from "./tokens"
import userReducer from "./user"
import postsReducer from "./posts"
import likesReducer from "./likes"
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

const persistConfigLikes = {
  key: 'likes',
  storage,
}



const allReducers = combineReducers({
    user: persistReducer(persistConfigUser, userReducer),
    tokens: persistReducer(persistConfigTokens, tokenReducer),
    posts: persistReducer(persistConfigPosts, postsReducer),
    likes: persistReducer(persistConfigLikes, likesReducer),
});

export const store = configureStore({
    reducer: allReducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)