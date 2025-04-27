import {configureStore} from '@reduxjs/toolkit'
import authReducer from './src/slices/authSlice'
import userReducer from './src/slices/userSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer
       
    }
    
  
})


// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import authReducer from '../src/slices/authSlice';
// import userReducer from '../src/slices/userSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//   },
// }));

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);