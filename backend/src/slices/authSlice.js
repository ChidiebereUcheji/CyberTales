import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('adminInfo')) || {}, // Retrieve from localStorage
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;

      // Save to localStorage
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.userInfo = {};

      // Remove from localStorage
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;