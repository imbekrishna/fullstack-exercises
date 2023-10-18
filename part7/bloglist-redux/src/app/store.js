import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import blogReducer from './blogSlice';
import accountReducer from './accountSlice';
import summaryReducer from './summarySlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: accountReducer,
    summary: summaryReducer,
  },
});
