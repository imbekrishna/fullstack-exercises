import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import jwtDecode from 'jwt-decode';
import { setMessage } from './notificationSlice';

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
        console.log(jwtDecode(user.token));
        if (jwtDecode(user.token).exp < Date.now() / 1000) {
          window.localStorage.removeItem('blogAppUser');
          return null;
        }
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
    dispatch(setMessage({ message: 'Login Successful' }));
  };
};

export default accountSlice.reducer;
