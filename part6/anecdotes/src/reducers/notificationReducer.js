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

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(addMessage(message));
    setTimeout(() => {
      dispatch(addMessage(null));
    }, timeout * 1000);
  };
};
export default notificationSlice.reducer;
