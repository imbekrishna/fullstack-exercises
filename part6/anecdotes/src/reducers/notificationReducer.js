import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addMessage(state, action) {
      if (action) {
        return action.payload;
      }
      return state;
    },
  },
});

export const { addMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
