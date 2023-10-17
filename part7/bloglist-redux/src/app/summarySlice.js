import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

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
    const response = await blogService.summary();
    dispatch(setSummary(response));
  };
};

export default summarySlice.reducer;
