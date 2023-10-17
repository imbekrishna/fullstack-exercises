import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isError: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      if (action.payload) {
        return { ...initialState, ...action.payload };
      }
      return state;
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
