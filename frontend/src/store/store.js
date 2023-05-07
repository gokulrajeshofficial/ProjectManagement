import {combineReducers, configureStore} from  '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {  persistReducer } from 'redux-persist';
import  userReducer  from './Slice/userDetails.slice';
import projectReducer from './Slice/projectDetails.slice'
const reducers = combineReducers({
    userReducer , projectReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer'], // Only persist the "userReducer" slice
};

const persistedReducer =  persistReducer(persistConfig, reducers);

export const store = configureStore ({
    reducer:{
        persistedReducer    }
}) ;