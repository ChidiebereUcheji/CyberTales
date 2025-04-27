import {createSlice} from '@reduxjs/toolkit'


const initialState = {
 
  fetchedUsers:  JSON.parse(localStorage.getItem('allUsers')) || [], // Retrieve from localStorage

}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
     
        setFetchedUsers: (state,action)=>{ 
            state.fetchedUsers = action.payload  
            localStorage.setItem('allUsers', JSON.stringify(action.payload));
        },
        clearAllUsers: (state) => {
            state.userInfo = {};
      
            // Remove from localStorage
            localStorage.removeItem('allUsers');
          },
       
    }
});

export const {  
    setFetchedUsers,
 } = userSlice.actions


 export const selectFetchedUsers = (state) => state.user.fetchedUsers;
  
  


export default userSlice.reducer;