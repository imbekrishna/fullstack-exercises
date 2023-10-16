import { createSlice } from '@reduxjs/toolkit';
import anecService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setAnecdotes, appendAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await anecService.getAll();
    dispatch(setAnecdotes(response));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecService.create(content);
    console.log(response);
    dispatch(appendAnecdotes(response));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes;
    const anecdote = state.find((and) => and.id === id);
    const updated = await anecService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    const voted = state.map((and) => (and.id === id ? updated : and));
    dispatch(setAnecdotes(voted));
  };
};
export default anecdoteSlice.reducer;
