import {configureStore} from '@reduxjs/toolkit'
import authReducer from './src/slices/authSlice'
import quizReducer from './src/slices/quizSlice';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        quiz:quizReducer,
       
       
    }
    
  
})


