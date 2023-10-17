import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    remove: (state, action) => {
      if (action.payload) {
        return state.filter((blog) => blog.id !== action.payload);
      }
      return state;
    },
    update: (state, action) => {
      if (action.payload) {
        const updated = action.payload;
        return state.map((blog) => (blog.id === updated.id ? updated : blog));
      }
      return state;
    },
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => state.concat(action.payload),
  },
});

export const { setBlogs, appendBlog, remove, update } = blogSlice.actions;

export const initalizeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch(appendBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.remove(id);
    dispatch(remove(id));
  };
};

export const updateBlog = (id, updated) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, updated);
    dispatch(update(blog));
  };
};

export default blogSlice.reducer;
