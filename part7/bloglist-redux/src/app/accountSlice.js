import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const accountSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
    getUser: (state) => {
      const blogAppUser = window.localStorage.getItem('blogAppUser');
      if (blogAppUser) {
        const user = JSON.parse(blogAppUser);
        blogService.setToken(user.token);
        return user;
      }
      return state;
    },
    removeUser: () => {
      window.localStorage.removeItem('blogAppUser');
      return null;
    },
  },
});

export const { setUser, getUser, removeUser } = accountSlice.actions;

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('blogAppUser', JSON.stringify(user));
    dispatch(setUser(user));
    blogService.setToken(user.token);
  };
};

export default accountSlice.reducer;
