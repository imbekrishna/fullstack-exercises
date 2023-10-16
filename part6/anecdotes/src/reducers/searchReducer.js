import { createSlice } from '@reduxjs/toolkit';

const searcSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    searchChange(state, action) {
      if (!action) {
        return state;
      }
      return action.payload;
    },
  },
});

export const { searchChange } = searcSlice.actions;
export default searcSlice.reducer;
