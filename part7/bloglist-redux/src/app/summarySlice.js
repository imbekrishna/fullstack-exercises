import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const summarySlice = createSlice({
  name: 'summary',
  initialState: [],

  reducers: {
    setSummary: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
  },
});

export const { setSummary } = summarySlice.actions;

export const getSummary = () => {
  return async (dispatch) => {
    const response = await userService.summary();
    dispatch(setSummary(response));
  };
};

export default summarySlice.reducer;
